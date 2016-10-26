$(document).ready(function(){

	$.ajax({ 
		url: "/subtractcredits",
		data: {amount:0}, 
		method: "PUT"
	}).done(function(data){ 
		$("#credits").text("credits: " + data.credits);
		$(".yourCredits").text("Your credits: " + data.credits);
	});

	$("body").css("background-image","url('/images/home_background.jpg')");
	$(".tatooine").on("click", function(){
		window.location = "/tatooine";
	});
	$(".endor").on("click", function(){
		$.ajax({
			url: "/starships",
			data: {},
			method: "PUT"
		}).done(function(data){
			var userStarships = data.starships;
			if(userStarships.indexOf("Millenium Falcon") !== -1){
				$.ajax({
					url: "/planets",
					data: {finishedPlanet:"tatooine"},
					method: "PUT"
				}).done(function(updatedStat){
					console.log(updatedStat.unfinishedPlanets);
				});
				window.location = "/endor";
			}
			else {
				alert("You need the Millenium Falcon to make it to Endor!");
			}
		});
	});
	$(".hoth").on("click", function(){
		$.ajax({
			url: "/subtractcredits",
			data: {},
			method: "PUT"
		}).done(function(data){
			var userStarships = data.starships;
			if(userStarships.indexOf("X-Wing") !== -1){
				$.ajax({
					url: "/planets",
					data: {finishedPlanet:"endor"},
					method: "PUT"
				}).done(function(updatedStat){
					console.log(updatedStat.unfinishedPlanets);
				});
				window.location = "/hoth";
			}
			else {
				alert("You need an X-Wing to make it to Hoth!");
			}
		});
	});
	$(".kashyyyk").on("click", function(){
		$.ajax({
			url: "/subtractcredits",
			data: {},
			method: "PUT"
		}).done(function(data){
			var userStarships = data.starships;
			if(userStarships.indexOf("Death Star") !== -1){
				$.ajax({
					url: "/planets",
					data: {finishedPlanet:"hoth"},
					method: "PUT"
				}).done(function(updatedStat){
					console.log(updatedStat.unfinishedPlanets);
				});
				window.location = "/kashyyyk";
			}
			else {
				alert("You need the Death Star to make it to kashyyyk!");
			}
		});
	});
});
