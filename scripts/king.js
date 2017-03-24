var game = {}; //game namespace
game.state = "";
game.turn = 0;

var advisors = ["milit","econ","culture","science"]

$(document).ready(function(){
	$(".my-button").hide();
	$(".opt0").show();
	$(".my-button").click(function(){
		$(".my-button").attr("disabled",true);
		setTimeout(function(){
			$(".my-button").removeAttr("disabled")
		},2500);
	});

	$(".opt0").click(function(){
		if(game.turn == 1){
			printToLog("Are you ready?");
			$(".opt0").text("I'm ready!");
		}

		if(game.turn == 2){
			// printToLog("You wake up to the sound of a loud horn.")
			$(".opt0").hide();
			$(".opt1").show();
			advanceStory();
		}
		
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})
	$(".opt1").click(function(){
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
	})

	$("#yes").click(function(){
	})
	$("#no").click(function(){
	})

});
