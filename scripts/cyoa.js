var game = {}; //game namespace
game.state = "";
game.turn = 0;

function printToLog(text){
	$('#log').append("<br/> - ~ - <br/>"+ text);
}

function getSetting(){
	if(game.state == ""){
		return ""
	}
}

$(document).ready(function(){
	$(".my-button").hide();
	$("#fin").hide();
	$(".opt0").show();
	$(".my-button").click(function(){
		game.turn++;
		$(".my-button").attr("disabled",true);
		setTimeout(function(){
			$(".my-button").removeAttr("disabled")
		},250);
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

	$("#b0").click(function(){
		game.state+="0";
		advanceStory();
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})
	$("#b1").click(function(){
		game.state+="1";
		advanceStory();
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})
	$("#b2").click(function(){
		game.state+="2";
		advanceStory();
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})
	$("#b3").click(function(){
		game.state+="3";
		advanceStory();
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})
});

function advanceStory(){
	if(theVillage){
		if(game.state == "031"){
			game.state = "00";
		}else if(game.state == "032"){
			game.state = "01";
		}else if(game.state == "033"){
			game.state = "02";
		}else if(game.state == "0101"){
			game.state = "0110";
		}else if(game.state == "00001" || game.state == "00021"){
			game.state = "0001";//choosing assassin's blade
		}else if(game.state == "00002" || game.state == "00012"){
			game.state = "0002";//choosing blacksmith's hammer
		}else if(game.state == "00022" || game.state == "00011"){
			game.state = "0000";//choosing sword
		}
		if(game.state == "03"){
			game.cry = true;
		}
	}


	var ary = villageMap.get(game.state);
	if(ary == null){
		$(".my-button").hide();
		return;
	}
	printToLog(ary[0]);
	for(var i = 0; i < 4; i++){
		if(i+1 < ary.length){
			$("#b"+i.toString()).show().text(ary[i+1]);
		}else{
			$("#b"+i.toString()).hide();
		}
	}
	if(ary.length<2){
		printToLog("<b>GAME OVER</b> Refresh to play again.");
	}
}
