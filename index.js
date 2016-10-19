                                     //REQUIRE ALL NECCESSARY MODULES
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
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
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET_KEY,
	resave: false,
	saveUninitialized: true
}));

var currentStatId = 0; 

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

                                        //ROUTES AND PATHS

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
					starships: ""
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
	res.render("landing", {user:user});
});

app.get("/home", function(req, res){
	var user = req.user;
	db.stat.find({
		where: {userId: user.id, id: currentStatId}
	}).then(function(stat){
			res.render("home", {user:user, stat: stat});
			console.log(stat);
	});
});




var server = app.listen(process.env.PORT || 3000);

module.exports = server;