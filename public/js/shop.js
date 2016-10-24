$(".buyFalcon").click(function(e){ 
	$.ajax({ 
		url: "/subtractcredits",
		data: {amount:0}, 
		method: "PUT"
	}).done(function(data){ 
		var userCredits = data.credits;
		var userStarships = data.starships;
		console.log("user credits: " + userCredits);
		console.log("buy falcon clicked"); 
		if(userStarships.indexOf("Millenium Falcon") === -1){
			if(userCredits >= 100000) {
				$.ajax({
					url: "/starships",
					data: {ship: "Millenium Falcon"},
					method: "PUT"
				}).done(function(data){

				});

				$.ajax({ 
					url: "/subtractcredits",
					data: {amount:100000}, 
					method: "PUT"
				}).done(function(data){ 
					$("#credits").text("credits: " + data.credits);
					$(".yourCredits").text("Your credits: " + data.credits);
					location.reload();
				});
			} else {
				console.log("You don't have enough credits to buy the Millenium Falcon.");
				$(".alert").text("You don't have enough credits to buy the Millenium Falcon.");
				setTimeout(function(){$(".alert").text("")},3000);
			}
		} else {
			console.log("You already own the Millenium Falcon.");
			$(".alert").text("You already own the Millenium Falcon.");
			setTimeout(function(){$(".alert").text("")},3000);
		}
	}); 
});

$(".buyxwing").click(function(e){ 
	$.ajax({ 
		url: "/subtractcredits",
		data: {amount:0}, 
		method: "PUT"
	}).done(function(data){ 
		var userCredits = data.credits;
		var userStarships = data.starships;
		console.log("user credits: " + userCredits);
		console.log("buy X-Wing clicked"); 
		if(userStarships.indexOf("X-Wing") === -1){
			if(userCredits >= 149999) {
			$.ajax({
				url: "/starships",
				data: {ship: "X-Wing"},
				method: "PUT"
			}).done(function(data){

			});

			$.ajax({ 
				url: "/subtractcredits",
				data: {amount:149999}, 
				method: "PUT"
			}).done(function(data){ 
				$("#credits").text("credits: " + data.credits);
				$(".yourCredits").text("Your credits: " + data.credits);
				location.reload();
		});
			} else {
				console.log("You don't have enough credits to buy the X-Wing");
				$(".alert").text("You don't have enough credits to buy the X-Wing.");
				setTimeout(function(){$(".alert").text("")},3000);
			}
		} else {
			console.log("You already own the X-Wing.");
			$(".alert").text("You already own the X-Wing.");
			setTimeout(function(){$(".alert").text("")},3000);
		}
	}); 
});

$(".buydstar").click(function(e){ 
	$.ajax({ 
		url: "/subtractcredits",
		data: {amount:0}, 
		method: "PUT"
	}).done(function(data){ 
		var userCredits = data.credits;
		var userStarships = data.starships;
		console.log("user credits: " + userCredits);
		console.log("buy death star clicked"); 
		if(userStarships.indexOf("Death Star") === -1){
			if(userCredits >= 1000000000000) {
				$.ajax({
					url: "/starships",
					data: {ship: "Death Star"},
					method: "PUT"
				}).done(function(data){

				});

				$.ajax({ 
					url: "/subtractcredits",
					data: {amount:1000000000000}, 
					method: "PUT"
				}).done(function(data){ 
					$("#credits").text("credits: " + data.credits);
					$(".yourCredits").text("Your credits: " + data.credits);
		});
			} else {
				console.log("You don't have enough credits to buy the Death Star.");
				$(".alert").text("You don't have enough credits to buy the Death Star.");
				setTimeout(function(){$(".alert").text("")},3000);
			}
		} else {
			console.log("You already own the Death Star.");
			$(".alert").text("You already own the Death Star.");
			setTimeout(function(){$(".alert").text("")},3000);
		}
	}); 
});


