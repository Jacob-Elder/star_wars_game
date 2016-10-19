var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var db = require("../models");

//passport has 3 functions we need to implement - serializeUser, deserializeUser, and use
//serializeUser - gets the id from the user object
passport.serializeUser(function(user, cb){
	cb(null, user.id);
});

//deserialize takes the id and looks up the user in the db (opposite of serialize)
passport.deserializeUser(function(id, cb){
	db.user.findById(id).then(function(user){
		cb(null, user);
	});
});

//use
passport.use(new localStrategy({
	//'email' and 'password' comes from the column names in our table
	usernameField: "email",
	passwordField: "password"
}, function(email, password, cb) {
	db.user.find({
		where: {email: email}
	}).then(function(user){
		console.log(user);
		if(!user || !user.validPassword(password)){
			cb(null, false);
		}
		else {
			cb(null, user);
		}
	}).catch(cb);
}));

module.exports = passport;