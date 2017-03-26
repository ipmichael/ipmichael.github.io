var game = {}; //game namespace
game.state = "";
game.turn = 0;
game.yesFn = function(){};
game.noFn = function(){};

var player = {};

var advisorTypes = ["Military","Economic","Cultural","Science"];
var advisors = [];

//all situation labels
var allSitLabels = ["peace", "peace2", "war0"];
var curSitLabels = [];

//situation objects (total = numLabels * numAdvisors)
var allSitObjs = [];
var curSitObjs = [];

var statMap = new Map();
statMap.set("Age", 21);
statMap.set("Health", 100);
statMap.set("Population", 10);
statMap.set("Morale",50);
statMap.set("Gold", 0);
statMap.set("Army", 0);

var infMap = new Map();
infMap.set("Castles", 1);
infMap.set("Huts", 5);
infMap.set("Land", 50);
infMap.set("Barracks", 0);

function updateStats(){

	var title = "";
	var value = statMap.get("Gold");
	if(value < 0){
		title += "Indebted ";
	}else if(value < 1000){
		title += "Poor ";
	}else if(value < 10000){
		title += "";
	}else if( value < 50000){
		title += "Rich "
	}else{
		title += "Incredibly Wealthy "
	}

	value = statMap.get("Age");
	if(value < 30){
		title += "Young ";
	}else if(value<40){
	}else if(value < 50){
		title += "Middle Aged ";
	}else if(value < 60){
		title += "Aging ";
	}else if( value < 80){
		title += "Ancient "
	}
	
	value = statMap.get("Morale")
	if(value < 20){
		title += "Hated ";
	}else if(value >70){
		title += "Loved ";
	}
	
	$("#title").html("The "+title+"King");

	$("#inf-box").html("<b>Infrastructure</b>");
    infMap.forEach(printToInf);
    $("#stat-box").html("<b>Stats</b>");
    statMap.forEach(printToStats);
}

function printToInf(value, key, map){
	if(value == 0){

    }else{
        $('#inf-box').append("<br/>"+key+": "+value);
    }   
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
    }else if(key == "Morale"){
    	var desc = "";
    	if(value > 70){
    		desc = "Euphoric";
    	}else if(value > 60){
    		desc = "Happy";
    	}else if(value >= 50){
    		desc = "Content";
    	}else if(value > 40){
    		desc = "Grumbling";
    	}else if(value > 30){
    		desc = "Disgusted"
    	}else{
    		desc = "Rioting"
    	}
        $('#stat-box').append("<br/>"+key+": "+desc);
    }else if(key=="Population"){
    	$('#stat-box').append("<br/>"+key+": "+parseFloat(value).toFixed(0));
    }else{
        $('#stat-box').append("<br/>"+key+": "+value);
    }    
}

//pass in name of stat and value to add, or multiplier if mult is true
function modStat(stat, val, mult){

	var orig = statMap.get(stat);

	if(mult){
		statMap.set(stat, (parseFloat(statMap.get(stat))*val).toFixed(0));
	}else{
		statMap.set(stat,parseFloat(statMap.get(stat))+parseFloat(val));
	}

	if(stat == "Population" || stat == "Army"){
		if(statMap.get(stat) < 0){
			statMap.set(stat, 0);
		}
	}

	var diff = statMap.get(stat) - orig;
	var sign = "";

	if(diff<0){
		sign = "-";
		diff = Math.abs(diff);
	}else{
		sign = "+";
	}
	if(diff != 0){
		$("#c-text").append("<br/>"+ stat+ " "+sign+" "+diff);
	}
	
}

//pass in name of stat and value to add, or multiplier if mult is true
function modInf(stat, val, mult){

	if(!infMap.has(stat)){
		infMap.set(stat, 0);
	}
	var orig = infMap.get(stat);

	if(mult){
		infMap.set(stat, (infMap.get(stat)*val).toFixed(0));
	}else{
		infMap.set(stat,infMap.get(stat)+val);
	}

	if(stat == "Huts" || stat == "Land"){
		if(infMap.get(stat) < 0){
			infMap.set(stat, 0);
		}
	}

	var diff = infMap.get(stat) - orig;
	var sign = "";

	if(diff<0){
		sign = "-";
		diff = Math.abs(diff);
	}else{
		sign = "+";
	}

	if(diff!=0){
		$("#c-text").append("<br/>"+ stat+ " "+sign+" "+diff);
	}
	
}

//sitMap is map of keywords for situations (i.e. flood, war) to array of objects what the advisor would say
//"flood" -> [{text:"Oh no, the flood wiped out the barn! Can I rebuild it?" yes:"yes, need barnz" no:"no, don't have moneyz", fnYes, fnNo},{},{}]
function Advisor(type,name){
	this.type = type;
	this.name = name;
	this.favor = 0;
}

var advisorMap = new Map();

function initGame(){
	player.health = 100;
	for(i=0;i<advisorTypes.length; i++){
		advisors.push(new Advisor(advisorTypes[i],getName()));
	}

	advisors[0].sitMap = militarySitMap();
	advisors[1].sitMap = economicSitMap();
	advisors[2].sitMap = culturalSitMap();
	advisors[3].sitMap = scienceSitMap();

	advisorMap.set("Military",advisors[0]);
	advisorMap.set("Economic",advisors[1]);
	advisorMap.set("Cultural",advisors[2]);
	advisorMap.set("Science",advisors[3]);

	//jumbling all situations together
	for(i = 0;i<advisors.length; i++){
		for(j = 0; j<allSitLabels.length; j++){
			allSitObjs.push(advisors[i].sitMap.get(allSitLabels[j]));
		}
	}

	curSitObjs = allSitObjs.slice();
	game.sit = curSitObjs[0];
	curSitObjs.splice(0,1);

	updateStats();
}

function oneYear(){
	modStat("Age",1,false);
	modStat("Population",infMap.get("Huts"),false);
	modStat("Gold",infMap.get("Land")-statMap.get("Population"),false);
}

$(document).ready(function(){
	$(".my-button").hide();
	$(".opt0").show();
	$(".my-button").click(function(){

		//function to check if game.turn is greater than certain number
		//add new possible situations during increments

		game.turn++;
		updateStats();
		$(".my-button").attr("disabled",true);
		setTimeout(function(){
			$(".my-button").removeAttr("disabled")
		},2500);
	});

	$(".opt0").click(function(){
		if(game.turn == 1){
			$("#log").text("Each decision you make progresses the game by one year and will have various effects on your kingdom. Are you ready?");
			$(".opt0").text("I'm ready!");
		}

		if(game.turn == 2){
			$(".opt0").hide();
			$(".opt1").show();

			initGame();
			//game.sit = "peace";
			update(0);
		}

		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		game.currentOptions = 1;
	})

	$(".opt1").click(function(){
		$("#c-text").text("");
		//every click, one year passes
		oneYear();
		updateStats();
		if(curSitObjs.length == 0){
			//reset array of situations to go through
			curSitObjs = allSitObjs.slice();
		}

		//before, when I would only change game.sit whenever all advisors had gone
		// if((game.turn-2) % advisors.length == 0){
		// 	//get random situatoin
		// 	var randSitNum = Math.floor(Math.random()*curSitObjs.length);
		// 	game.sit = curSitObjs[randSitNum];
		// }else if((game.turn - 2) % advisors.length == 1 ){
		// 	var i = curSitObjs.indexOf(game.sit);
		// 	curSitObjs.splice(i,1);
		// }

		var randSitNum = Math.floor(Math.random()*curSitObjs.length);
		game.sit = curSitObjs[randSitNum];
		curSitObjs.splice(randSitNum,1);

		$("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
		if(!playerAlive()){
			//game over
		}
		updateStats();
	})

	$("#yes").click(function(){
		game.yesFn();
		update(1);
		updateStats();
	})
	$("#no").click(function(){
		game.noFn();
		update(-1);
		updateStats();
	})

});

//update things
function update(favor){

	//when I used game.sit = "peace"
	// var prevIndex = (game.turn - 1) % advisors.length;
	// var prevAdv = advisors[prevIndex];
	// prevAdv.favor += favor;
	// var index = game.turn % advisors.length;
	// var currentAdv = advisors[index];
	// $("#log").html("<b>"+currentAdv.name + " the " + currentAdv.type + " Advisor</b>");

	// $("#a-text").text("\""+currentAdv.sitMap.get(game.sit).speak+"\"");//TODO
	// $("#yes").text(currentAdv.sitMap.get(game.sit).yes);
	// $("#no").text(currentAdv.sitMap.get(game.sit).no);
	// game.yesFn = currentAdv.sitMap.get(game.sit)["yesFn"];
	// game.noFn = currentAdv.sitMap.get(game.sit)["noFn"];

	var advType = game.sit.type;
	var advName = advisorMap.get(advType).name;

	advisorMap.get(advType).favor += favor;

	$("#log").html("<b>"+ advName + " the " + advType + " Advisor</b>");


	//now game.sit is the object
	$("#a-text").text("\""+game.sit.speak+"\"");//TODO
	$("#yes").text(game.sit.yes);
	$("#no").text(game.sit.no);
	game.yesFn = game.sit["yesFn"];
	game.noFn = game.sit["noFn"];
}

function playerAlive(){
	if(player.health <= 0){
		$("#log").html("<b>GAME OVER</b>");
		$("#a-text").text("You died of crippling injuries");
		$(".my-button").hide();
		return false;
	}

	if(statMap.get("Population") <= 0 && statMap.get("Army") <= 0){
		$("#log").html("<b>GAME OVER</b>");
		$("#a-text").text("Your population was wiped out and a neighboring kingdom promptly beheads you.");
		$(".my-button").hide();
		return false;
	}

	return true;
}
