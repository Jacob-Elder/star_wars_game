	$(document).ready(function(){
		$('body').css("background-image", "url('/images/tatooine_background.JPG')");
		$('.character1').append("<img class='characterPic jawaPic' src='/images/jawa.png'>");
		$('.character2').append("<img class='characterPic tusken-raiderPic' src='/images/tusken-raider.png'>");
		$('.character3').append("<img class='characterPic anakinPic' src='/images/anakin.png'>");
		$('.character3').css("height", "240px");
		
		$(".anakinQuestion1").hide();
		$(".anakinResponse1").hide();
		$(".anakinQuestion2").hide();
		$(".anakinQuestion21").hide();
		$(".anakinResponse2").hide();
		$(".anakinQuestion3").hide();
		$(".anakinQuestion4").hide();
		$(".anakinQuestion5").hide();
		$(".anakinResponse3").hide();
		$(".anakinQuestion6").hide();

		$(".jawaQuestion1").hide();
		$(".jawaResponse1").hide();
		$(".jawaQuestion2").hide();
		$(".jawaQuestion21").hide();
		$(".jawaResponse2").hide();
		$(".jawaQuestion3").hide();
		$(".jawaQuestion4").hide();
		$(".jawaQuestionMoney").hide();
		$(".jawaQuestion5").hide();

		$('.anakinPic').on("click", function(){
			$(".dialogueBox").show();
			$(".anakinQuestion1").show();
			$(".anakinResponse1").show();
		});

		$(".anakin_yes").click(function(e){
			$(".anakinQuestion1").hide();
			$(".anakinResponse1").hide();
			$(".anakinQuestion2").show();
			$(".anakinResponse2").show();
		});

		$(".anakin_maybe").click(function(e){
			$(".anakinQuestion1").hide();
			$(".anakinResponse1").hide();
			$(".anakinQuestion2").show();
			$(".anakinResponse2").show();
		});

		$(".anakin_no").click(function(e){
			$(".anakinQuestion1").hide();
			$(".anakinResponse1").hide();
			$(".anakinQuestion21").show();
			setTimeout(function(){
				$(".dialogueBox").hide();
				$(".anakin").hide();
				$(".anakinPic").hide();
			}, 5000);
		});

		$(".anakin_alittle").click(function(e){
			$(".anakinQuestion2").hide();
			$(".anakinResponse2").hide();
			$(".anakinQuestion3").show();
			$.ajax({
				url: "/credits",
				data: {amount: 40000},
				method: "PUT"
			}).done(function(data){
				$("#credits").text("credits: " + data.credits);
			});
			setTimeout(function(){
				$(".anakinQuestion3").hide();
				$(".dialogueBox").hide();
				$(".anakin").hide();
				$(".anakinPic").hide();
			}, 5000);
		});

		$(".anakin_nothing").click(function(e) {
			$(".anakinQuestion2").hide();
			$(".anakinResponse2").hide();
			$(".anakinQuestion4").show();
			$(".anakinResponse3").show();
		});

		$(".anakin_accept").click(function(e) {
			$(".anakinQuestion4").hide();
			$(".anakinResponse3").hide();
			$(".anakinQuestion3").show();
			$.ajax({
				url: "/credits",
				data: {amount: 40000},
				method: "PUT"
			}).done(function(data){
				$("#credits").text("credits: " + data.credits);
			});
			setTimeout(function(){
				$(".anakinQuestion3").hide();
				$(".dialogueBox").hide();
				$(".anakin").hide();
				$(".anakinPic").hide();
			}, 5000);
		});

		$(".anakin_decline").click(function(e) {
			$(".anakinQuestion4").hide();
			$(".anakinResponse3").hide();
			$(".anakinQuestion5").show();
			setTimeout(function(){
				$(".anakinQuestion5").hide();
				$(".dialogueBox").hide();
				$(".anakin").hide();
				$(".anakinPic").hide();
			}, 5000);
		});

		$(".anakin_alot").click(function(e) {
			$(".anakinQuestion2").hide();
			$(".anakinResponse2").hide();
			$(".anakinQuestion6").show();
			setTimeout(function(){
				$(".anakinQuestion6").hide();
				$(".dialogueBox").hide();
				$(".anakin").hide();
				$(".anakinPic").hide();
			}, 5000);
		})

			                                         // Jawa Interaction

			$('.jawaPic').on("click", function(){
			$(".dialogueBox").show();
			$(".jawaQuestion1").show();
			$(".jawaResponse1").show();
		});

		$(".jawa_yes").click(function(e){
			$(".jawaQuestion1").hide();
			$(".jawaResponse1").hide();
			$(".jawaQuestion4").show();
			setTimeout(function(){
				$(".jawaQuestion4").hide();
				$(".dialogueBox").hide();
				$(".jawa").hide();
				$(".jawaPic").hide();
			}, 5000);
		});

		$(".jawa_maybe").click(function(e){
			$(".jawaQuestion1").hide();
			$(".jawaResponse1").hide();
			$(".jawaQuestion2").show();
			$(".jawaResponse2").show();
		});

		$(".jawa_no").click(function(e){
			$(".jawaQuestion1").hide();
			$(".jawaResponse1").hide();
			$(".jawaQuestion21").show();
			setTimeout(function(){
				$(".dialogueBox").hide();
				$(".jawa").hide();
				$(".jawaPic").hide();
			}, 5000);
		});

		$(".jawa_everything").click(function(){
			$(".jawaResponse2").hide();
			$(".jawaQuestion2").hide();
			$(".jawaQuestion3").show();
			setTimeout(function(){
				$(".dialogueBox").hide();
				$(".jawa").hide();
				$(".jawaPic").hide();
			}, 5000);
		});

		$(".jawa_alittle").click(function(e){
			$(".jawaQuestion2").hide();
			$(".jawaResponse2").hide();
			$(".jawaQuestionMoney").show();
			$.ajax({
				url: "/credits",
				data: {amount: 60000},
				method: "PUT"
			}).done(function(data){
				$("#credits").text("credits: " + data.credits);
			});
			setTimeout(function(){
				$(".jawaQuestion3").hide();
				$(".jawaQuestionMoney").hide();
				$(".dialogueBox").hide();
				$(".jawaPic").hide();
			}, 5000);
		});

		$(".jawa_alot").click(function(e){
			$(".jawaQuestion2").hide();
			$(".jawaResponse2").hide();
			$(".jawaQuestion5").show();
			$.ajax({
				url: "/credits",
				data: {amount: 60000},
				method: "PUT"
			}).done(function(data){
				$("#credits").text("credits: " + data.credits);
			});
			setTimeout(function(){
				$(".jawaQuestion5").hide();
				$(".dialogueBox").hide();
				$(".jawaPic").hide();
			}, 5000);
		});


	});
