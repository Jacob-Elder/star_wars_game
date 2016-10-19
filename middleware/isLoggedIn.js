module.exports = function(req, res, next){
	//we are passing false if the user is not signed in
	if(!req.user){
		res.redirect("/sign_in");
	}
	else {
		next();
	}
}