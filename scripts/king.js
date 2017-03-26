var game = {}; //game namespace
game.state = "";
game.turn = 0;
game.yesFn = function(){};
game.noFn = function(){};

var player = {};

var advisorTypes = ["Military","Economic","Cultural","Science"];
var advisors = [];

var allSituations = ["peace", "peace2"];
var curSituations = [];

var statMap = new Map();
statMap.set("Age", 21);
statMap.set("Health", 100);
statMap.set("Population", 100);
statMap.set("People's Happiness",50);
statMap.set("Gold", 0);
statMap.set("Army", 0);

function updateStats(){

    $("#stat-box").html("<b>Stats</b>");
    statMap.forEach(printToStats);
}

function printToStats(value, key, map){
    if(key == "Health"){
    	var desc = "";
    	if(value > 100){
    		desc = "Incredible";
    	}else if(value > 70){
    		desc = "Healthy";
    	}else if(value > 30){
    		desc = "Injured";
    	}else{
    		desc = "Dying";
    	}
        $('#stat-box').append("<br/>"+key+": "+desc);
    }else if(key == "People's Happiness"){
    	var desc = "";
    	if(value > 70){
    		desc = "Euphoric";
    	}else if(value > 60){
    		desc = "Happy";
    	}else if(value >= 50){
    		desc = "Content";
    	}else if(value > 40{
    		desc = "Grumbling";
    	}else if(value > 30){
    		desc = "Disgusted"
    	}else{
    		desc = ""
    	}
        $('#stat-box').append("<br/>"+key+": "+desc);
    }else{
        $('#stat-box').append("<br/>"+key+": "+value);
    }    
}

//pass in name of stat and value to add, or multiplier if mult is true
function modStat(stat, val, mult){
	if(mult){
		statMap.set(stat, statMap.get(stat)*val);
	}else{
		statMap.set(stat,statMap.get(stat)+val);
	}
}

//sitMap is map of keywords for situations (i.e. flood, war) to array of objects what the advisor would say
//"flood" -> [{text:"Oh no, the flood wiped out the barn! Can I rebuild it?" yes:"yes, need barnz" no:"no, don't have moneyz", fnYes, fnNo},{},{}]
function Advisor(type,name){
	this.type = type;
	this.name = name;
	this.favor = 0;
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
	updateStats();
}

$(document).ready(function(){
	$(".my-button").hide();
	$(".opt0").show();
	$(".my-button").click(function(){

		//function to check if game.turn is greater than certain number
		//add new possible situations during increments

		game.turn++;
		$(".my-button").attr("disabled",true);
		setTimeout(function(){
			$(".my-button").removeAttr("disabled")
		},2500);
	});

	$(".opt0").click(function(){
		if(game.turn == 1){
			$("#log").text("Are you ready?");
			$(".opt0").text("I'm ready!");
		}

		if(game.turn == 2){
			$(".opt0").hide();
			$(".opt1").show();

			initGame();
			game.sit = "peace";
			update(0);
		}

		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})

	$(".opt1").click(function(){
		updateStats();
		if(curSituations.length == 0){
			curSituations = allSituations.slice();
		}
		if((game.turn-2) % advisors.length == 0){
			//full rotation
			var randSitNum = Math.floor(Math.random()*curSituations.length);
			game.sit = curSituations[randSitNum];
			modStat("Age",1,false);
		}else if((game.turn - 2) % advisors.length == 1 ){
			var i = curSituations.indexOf(game.sit);
			curSituations.splice(i,1);
		}
		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		updateStats();
	})

	$("#yes").click(function(){
		game.yesFn();
		update(1);
	})
	$("#no").click(function(){
		game.noFn();
		update(-1);
	})

});

//update things
function update(favor){
	var prevIndex = (game.turn - 1) % advisors.length;
	var prevAdv = advisors[prevIndex];
	prevAdv.favor += favor;
	var index = game.turn % advisors.length;
	var currentAdv = advisors[index];
	$("#log").text(currentAdv.name + " the " + currentAdv.type + " Advisor");
	$("#a-text").text(currentAdv.sitMap.get(game.sit).speak);//TODO
	$("#yes").text(currentAdv.sitMap.get(game.sit).yes);
	$("#no").text(currentAdv.sitMap.get(game.sit).no);
	game.yesFn = currentAdv.sitMap.get(game.sit)["yesFn"];
	game.noFn = currentAdv.sitMap.get(game.sit)["noFn"];
}

function playerAlive(){
	if(player.health > 0){
		return true;
	}

	return false;
}
