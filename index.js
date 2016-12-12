                                     //REQUIRE ALL NECCESSARY MODULES
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require("request");
var bcrypt = require("bcrypt");
var passport = require("./config/ppConfig");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var localStorage = require('localStorage'),myStarships = { foo: 'bar', baz: 'quux' };
var isLoggedIn = require("./middleware/isLoggedIn");
var flash = require("connect-flash");
require("dotenv").config();
var db = require("./models");

                                    //DECLARE THE EXPRESS APP VARIABLE
var app = express();

                                    //USE AND SET STATEMENTS FOR APP
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET_KEY,
	resave: false,
	saveUninitialized: true
})); 

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});



                                        //ROUTES AND PATHS
var currentStatId;

//render the sign in page
app.get("/", function(req, res){
	res.render('sign_in');
});

//sign the user in if info is correct
app.post('/', passport.authenticate("local", {
	successRedirect: "/landing",
	failureRedirect: "/",
	failureFlash: "Invalid credentials",
	successFlash: "You have successfully logged in"
}));

//render the sign up page
app.get("/sign_up", function(req, res){
	res.render("sign_up");
});

//create new user if they dont already exist
app.post("/sign_up", function(req, res){
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: {
			name: req.body.name,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated){
			console.log("account created and signed in");
			user.createStat({
					savename: "save slot 1",
					location: "tatooine",
					credits: 0,
					starships: "",
					unfinishedplanets: "kashyyyk,hoth,endor,tatooine"
			}).then(function(stat){
				currentStatId = stat.id;
			})
			passport.authenticate("local", {
				successRedirect: "/landing"
			})(req, res);
		}
		else {
			req.flash("error", "Email exists already");
			console.log("error", "Email exists already");
			res.redirect("/");
		}
	}).catch(function(err){
		req.flash("error", "An error occurred: " + err.message);
		res.redirect("/");
	});
});

//show the users saved files
app.get("/landing", function(req, res){
	var user = req.user;
	db.stat.findAll({
		where: {userId: user.id}
	}).then(function(stat){
		res.render("landing", {user:user, stat:stat});
	});
});

//POST which save file the user selects
var currentSaveFile;
app.post("/landing", function(req, res){
	var user = req.user;
	currentSaveFile = req.body.saveFile;
	console.log(currentSaveFile);
	db.stat.findOrCreate({
		where: {userId: user.id, savename: currentSaveFile},
		defaults: {
			userId: user.id,
			savename: currentSaveFile,
			location: "tatooine",
			credits: 0,
			starships: "",
			unfinishedplanets: "kashyyyk,hoth,endor,tatooine"
		}
	}).spread(function(stat, wasCreated){
			console.log(stat);
			localStorage.setItem('myKey', "random!");
			res.redirect("/home");
	}).catch(function(err){
		console.log("error", "something went wrong!!!");
		res.redirect("/");
	});
});

//render the home page
app.get("/home", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		res.render("home", {user:user, stat: stat});
	});
});

//route for getting the players stats
app.get("/getStats", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		res.send(stat);
	});
});


//route for adding new ships that the player buys
app.put("/starships", function(req,res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		stat.updateAttributes({
			starships: stat.starships += ("," + req.body.ship)
		}).then(function(updatedStat){
			res.send(updatedStat);
		});
	});
});

//route for removing planets when a user travels to the next one 
app.put("/planets", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		var array = stat.unfinishedplanets.split(",");
		var searchTerm = req.body.finishedPlanet;
		stat.updateAttributes({
			unfinishedplanets: stat.unfinishedplanets = (array.filter(function(i){return i !== searchTerm})).join(",")
		}).then(function(updatedStat){
			res.send(updatedStat);
		});
	});
});

//route for deleting starships when the user sells them
app.delete("/sell-starship", function(req, res){
	var user = req.user;
	var ship = req.body.ship;
	console.log(ship);
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		var array = stat.starships.split(",");
		var searchTerm = ship;
		stat.updateAttributes({
			starships: stat.starships = (array.filter(function(i){return i !== searchTerm})).join(",")
		}).then(function(updatedStat){
			res.send(updatedStat);
		});
	});
});

//route for adding credits
app.put("/credits", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile},
	}).then(function(stat){
		console.log(stat);
		if (stat) {
			stat.updateAttributes({
				credits: stat.credits += parseInt(req.body.amount)
			}).then(function(updatedStat){
				res.send(updatedStat);
			});
		}
	});
});

//route for subtracting credits
app.put("/subtractcredits", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile},
	}).then(function(stat){
		console.log(stat);
		if (stat) {
			stat.updateAttributes({
				credits: stat.credits -= parseInt(req.body.amount)
			}).then(function(updatedStat){
				res.send(updatedStat);
			});
		}
	});
});

//render the tatooine page
app.get("/tatooine", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
			res.render("tatooine", {user:user, stat: stat});
	});
});

//render the endor page 
app.get("/endor", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		res.render("endor", {user:user, stat: stat});
	});
});

//render the hoth page
app.get("/hoth", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		res.render("hoth", {user:user, stat: stat});
	});
});

//render the kashyyyk page
app.get("/kashyyyk", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
		res.render("kashyyyk", {user:user, stat: stat});
	});
});




var server = app.listen(process.env.PORT || 3000);

module.exports = server;