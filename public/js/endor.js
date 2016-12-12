$(document).ready(function(){

	console.log("welcome to endor!");
	$('body').css("background-image", "url('/images/endor_background.jpg')");
	$('.character1').append("<img class='characterPic ewokPic' src='/images/ewok.png'>");
	$('.character2').append("<img class='characterPic trooperPic' src='/images/imperial_scout.png'>");
	$('.character2').css("height", "35%");
	$('.character2').css("left", "320px");
	$('.character2').css("bottom", "65px");
	$('.character1').css("left", "350px");
	$('.character1').css("bottom", "80px");
	$('.ewokPic').hide();

	$(".trooper").hide();
	$(".ewok").hide();


                                    // Trooper Interaction

	$('.trooperPic').on("click", function(){
		$(".dialogueBox").show();
		$(".trooperQuestion1").show();
		$(".trooperResponse1").show();
	});

	$(".trooper_lost").on('click', function() {
		$(".trooperQuestion1").hide();
		$(".trooperResponse1").hide();
		$(".trooperQuestion2").show();
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion2").hide();
		}, 5000)
	});

	$(".trooper_vader").on('click', function() {
		$(".trooperQuestion1").hide();
		$(".trooperResponse1").hide();
		$(".trooperQuestion3").show();
		$(".trooperResponse2").show();
	});

	$(".trooper_advisor").on('click', function(){
		$(".trooperQuestion3").hide();
		$(".trooperResponse2").hide();
		$(".trooperQuestion4").show();
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion4").hide();
		}, 8000)
	});

	$(".trooper_displeased").on('click', function() {
		$(".trooperQuestion3").hide();
		$(".trooperResponse2").hide();
		$(".trooperQuestion5").show();
		$(".trooperResponse3").show();
	});

	$(".trooper_alittle").on('click', function() {
		$(".trooperQuestion5").hide();
		$(".trooperResponse3").hide();
		$(".trooperQuestion7").show();
		$.ajax({
			url: "/credits",
			data: {amount: 40000},
			method: "PUT"
		}).done(function(data){
			$("#credits").text("credits: " + data.credits);
		});
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion7").hide();
		}, 6500)
	});

	$(".trooper_alot").on('click', function() {
		$(".trooperQuestion5").hide();
		$(".trooperResponse3").hide();
		$(".trooperQuestion6").show();
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion6").hide();
		}, 6500)
	});

	$(".trooper_compliment").on('click', function() {
		$(".trooperQuestion1").hide();
		$(".trooperResponse1").hide();
		$(".trooperQuestion8").show();
		$(".trooperResponse4").show();
	});

	$(".trooper_handy").on('click', function() {
		$(".trooperQuestion8").hide();
		$(".trooperResponse4").hide();
		$(".trooperQuestion9").show();
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion9").hide();
		}, 6500)
	});

	$(".trooper_intel").on('click', function() {
		$(".trooperQuestion8").hide();
		$(".trooperResponse4").hide();
		$(".trooperQuestion10").show();
		$(".trooperResponse5").show();
	});

	$(".trooper_money_first").on('click', function() {
		$(".trooperQuestion10").hide();
		$(".trooperResponse5").hide();
		$(".trooperQuestion11").show();
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion11").hide();
		}, 6500)
	});

	$(".trooper_tell").on('click', function() {
		$(".trooperQuestion10").hide();
		$(".trooperResponse5").hide();
		$(".trooperQuestion12").show();
		$.ajax({
			url: "/credits",
			data: {amount: 40000},
			method: "PUT"
		}).done(function(data){
			$("#credits").text("credits: " + data.credits);
		});
		setTimeout(function(){
			$(".dialogueBox").hide();
			$(".trooperPic").hide();
			$(".ewokPic").show();
			$(".ewokPic").parent().css('z-index', 10);
			$(".trooperQuestion12").hide();
		}, 6500)
	});

	                                // Ewok Interaction

	    $(".ewokPic").on('click', function() {
	    	$(".dialogueBox").show();
			$(".ewokQuestion1").show();
			$(".ewokResponse1").show();
	    });

	    $(".ewok_truth").on('click', function() {
	    	$(".ewokQuestion1").hide();
			$(".ewokResponse1").hide();
			$(".ewokQuestion2").show();
			setTimeout(function(){
				$(".dialogueBox").hide();
				$(".ewokPic").hide();
				$(".ewokQuestion2").hide();
		}, 6500)
	    });

	    $(".ewok_lie").on('click', function() {
	    	$(".ewokQuestion1").hide();
			$(".ewokResponse1").hide();
			$(".ewokQuestion3").show();
			$(".ewokResponse2").show();
	    });

	    $(".ewok_money").on('click', function() {
	    	$(".ewokQuestion3").hide();
			$(".ewokResponse2").hide();
			$(".ewokQuestion4").show();
			setTimeout(function(){
				$(".dialogueBox").hide();
				$(".ewokPic").hide();
				$(".ewokQuestion4").hide();
			}, 6500)
	    });

	    $(".ewok_supplies").on('click', function() {
	    	$(".ewokQuestion3").hide();
			$(".ewokResponse2").hide();
			$(".ewokQuestion5").show();
			$.ajax({
				url: "/credits",
				data: {amount: 20000},
				method: "PUT"
			}).done(function(data){
				$("#credits").text("credits: " + data.credits);
			});
			setTimeout(function(){
				$(".dialogueBox").hide();
				$(".ewokPic").hide();
				$(".ewokQuestion5").hide();
			}, 10000)
		});

});