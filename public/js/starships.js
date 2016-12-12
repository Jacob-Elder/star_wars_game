$("#Death_Star").on('click', function(){
		console.log("death star clicked");
		$.ajax({
			url: "https://swapi.co/api/starships/9/",
			method: 'GET',
			success: function(result){
			 	console.log(result);
			 	$('#sell').attr('data-ship', 'Death Star');
			 	$('#sell').attr('data-price', '1000000000000');
         		$(".shipTitle").text(result.name);
         		$("#costInCredits").text("Cost: " + result.cost_in_credits);
         		$("#length").text("Length: " + result.length + " meters");
         		$("#speed").text("Speed: " + result.max_atmosphering_speed);
         		$("#starShipConsumables").text("Stores enough supplies to survive for " + result.consumables);
         		$("#starshipPic").attr("src", "/images/death_star.png");
    		}
    	});
	});
	$("#X-Wing").on('click', function(){
		console.log("X-wing clicked");
		$.ajax({
			url: "https://swapi.co/api/starships/12/",
			method: 'GET',
			success: function(result){
			 	console.log(result);
			 	$('#sell').attr('data-ship', 'X-Wing');
			 	$('#sell').attr('data-price', '150000');
         		$(".shipTitle").text(result.name);
         		$("#costInCredits").text("Cost: " + result.cost_in_credits);
         		$("#length").text("Length: " + result.length + " meters");
         		$("#speed").text("Speed: " + result.max_atmosphering_speed);
         		$("#starShipConsumables").text("Stores enough supplies to survive for " + result.consumables);
         		$("#starshipPic").attr("src", "/images/X-wing.png");
    		}
    	});
	});
	$("#Millenium_Falcon").on('click', function(){
		console.log("Millenium Falcon clicked");
		$.ajax({
			url: "https://swapi.co/api/starships/10/",
			method: 'GET',
			success: function(result){
			 	console.log(result);
			 	$('#sell').attr('data-ship', 'Millenium Falcon');
			 	$('#sell').attr('data-price', '100000');
         		$(".shipTitle").text(result.name);
         		$("#costInCredits").text("Cost: " + result.cost_in_credits);
         		$("#length").text("Length: " + result.length + " meters");
         		$("#speed").text("Speed: " + result.max_atmosphering_speed);
         		$("#starShipConsumables").text("Stores enough supplies to survive for " + result.consumables);
         		$("#starshipPic").attr("src", "/images/millenium_falcon.png");
    		}
    	});
	});

	                         // Display All Ships When you click on the 'shop' button
	$("#shop").on('click', function(){
		console.log("shop button clicked");
		$.ajax({
			url: "https://swapi.co/api/starships/10/",
			method: 'GET',
			success: function(falcon){
			 	console.log(falcon);
			 	$(".falconTitle").text(falcon.name);
			 	$(".falconCost").text("Cost: " + falcon.cost_in_credits);
			 	$(".falconLength").text("Length: " + falcon.length + " meters");
			 	$(".falconSpeed").text("Speed: " + falcon.max_atmosphering_speed);
			 	$(".falconConsumables").text("Supplies: " + falcon.consumables);
    		}
    	});
    	$.ajax({
			url: "https://swapi.co/api/starships/12/",
			method: 'GET',
			success: function(xwing){
			 	console.log(xwing);
			 	$(".xwingTitle").text(xwing.name);
			 	$(".xwingCost").text("Cost: " + xwing.cost_in_credits);
			 	$(".xwingLength").text("Length: " + xwing.length + " meters");
			 	$(".xwingSpeed").text("Speed: " + xwing.max_atmosphering_speed);
			 	$(".xwingConsumables").text("Supplies: " + xwing.consumables);
    		}
    	});
    	$.ajax({
			url: "https://swapi.co/api/starships/9/",
			method: 'GET',
			success: function(deathstar){
			 	console.log(deathstar);
			 	$(".dstarTitle").text(deathstar.name);
			 	$(".dstarCost").text("Cost: " + deathstar.cost_in_credits);
			 	$(".dstarLength").text("Length: " + deathstar.length + " meters");
			 	$(".dstarSpeed").text("Speed: " + deathstar.max_atmosphering_speed);
			 	$(".dstarConsumables").text("Supplies: " + deathstar.consumables);
    		}
    	});
	});