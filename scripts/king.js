var game = {}; //game namespace
game.state = "";
game.turn = 0;
game.yesFn = function(){};
game.noFn = function(){};

var player = {};

var advisorTypes = ["Military","Economic","Cultural","Science"];
var advisors = [];

var allSituations = ["peace"];

//sitMap is map of keywords for situations (i.e. flood, war) to array of objects what the advisor would say
//"flood" -> [{text:"Oh no, the flood wiped out the barn! Can I rebuild it?" yes:"yes, need barnz" no:"no, don't have moneyz", fnYes, fnNo},{},{}]
function Advisor(type,name){
	this.type = type;
	this.name = name;
}

function initGame(){
	player.health = 100;
	for(i=0;i<advisorTypes.length; i++){
		advisors.push(new Advisor(advisorTypes[i],getName()));
	}

	advisors[0].sitMap = militarySitMap();
	advisors[1].sitMap = economicSitMap();
	advisors[2].sitMap = culturalSitMap();
	advisors[3].sitMap = scienceSitMap();
}

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
			$("#log")("Are you ready?");
			$(".opt0").text("I'm ready!");
		}

		if(game.turn == 2){
			$(".opt0").hide();
			$(".opt1").show();

			initGame();
			game.sit = "peace";
			update();
		}

		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})

	$(".opt1").click(function(){
		game.turn++;
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
	})

	$("#yes").click(function(){
		game.yesFn();
	})
	$("#no").click(function(){
		game.noFn();
	})

});

//update things
function update(){
	var index = game.turn % advisors.length;
	var currentAdv = advisors[index];
	$("#log").text(currentAdv.name + " the " + currentAdv.type + " Advisor");
	$("#a-text").text(currentAdv.sitMap.get(game.sit).speak);//TODO
	$("#yes").text(currentAdv.sitMap.get(game.sit).yes);
	$("#no").text(currentAdv.sitMap.get(game.sit).no);
	game.yesFn = currentAdv.sitMap.get(game.sit).yesFn();
	game.noFn = currentAdv.sitMap.get(game.sit).noFn();
}

function playerAlive(){
	if(player.health > 0){
		return true;
	}

	return false;
}
