                                     //REQUIRE ALL NECCESSARY MODULES
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require("request");
var bcrypt = require("bcrypt");
var passport = require("./config/ppConfig");
var session = require("express-session");
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
	failureRedirect: "/log_in",
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
					starships: "X-Wing,Millenium Falcon,Death Star"
			}).then(function(stat){
				currentStatId = stat.id;
			})
			passport.authenticate("local", {
				successRedirect: "/landing"
			})(req, res);
		}
		else {
			console.log("error", "Email exists already");
			res.redirect("/");
		}
	}).catch(function(err){
		console.log("error", "An error occurred: " + err.message);
		res.redirect("/");
	});
});

app.get("/landing", function(req, res){
	var user = req.user;
	db.stat.findAll({
		where: {userId: user.id}
	}).then(function(stat){
		res.render("landing", {user:user, stat:stat});
	});
});

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
			starships: ""
		}
	}).spread(function(stat, wasCreated){
			console.log(stat);
			res.redirect("/home");
	}).catch(function(err){
		console.log("error", "something went wrong!!!");
		res.redirect("/");
	});
});

app.get("/home", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
			res.render("home", {user:user, stat: stat});
	});
});

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

app.get("/tatooine", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, savename: currentSaveFile}
	}).then(function(stat){
			res.render("tatooine", {user:user, stat: stat});
	});
});

app.get("/endor", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, id: currentStatId}
	}).then(function(stat){
		res.render("endor", {user:user, stat:stat});
	});
});

app.get("/hoth", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, id: currentStatId}
	}).then(function(stat){
		res.render("hoth", {user:user, stat: stat});
	});
});

app.get("/kashyyyk", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, id: currentStatId}
	}).then(function(stat){
		res.render("kashyyyk", {user:user, stat: stat});
	});
});




var server = app.listen(process.env.PORT || 3000);

module.exports = server;