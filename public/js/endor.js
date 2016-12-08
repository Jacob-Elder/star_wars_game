$(document).ready(function(){

	console.log("welcome to endor!");
	$('body').css("background-image", "url('/images/endor_background.jpg')");
	$('.character1').append("<img class='characterPic ewokPic' src='/images/ewok.png'>");
	$('.character2').append("<img class='characterPic trooperPic' src='/images/imperial_scout.png'>");
	$('.character2').css("height", "35%");
	$('.character2').css("left", "320px");
	$('.character2').css("bottom", "65px");
	$('.character1').css("left", "320px");
	$('.character1').css("bottom", "65px");
	$('.character1').hide();

	$(".trooperQuestion1").hide();
	$(".trooperResponse1").hide();
	$(".trooperQuestion2").hide();



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
			$(".trooperQuestion2").hide();
		}, 5000)
	});

	$(".trooper_vader").on('click', function() {
		$(".trooperQuestion1").hide();
		$(".trooperResponse1").hide();
	});

	$(".trooper_compliment").on('click', function() {
		$(".trooperQuestion1").hide();
		$(".trooperResponse1").hide();
	});


});