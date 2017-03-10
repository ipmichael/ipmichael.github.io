var game = {}; //game namespace
game.turn = 0;
game.currentOptions = 0;
game.level = 1;
game.options = new Object();

var player = new Object();
player.stats = new Map();
player.stats.set("Health", 10);
player.stats.set("Strength",1);
player.stats.set("Stamina", 1);//percentage out of 100
player.stats.set("Accuracy",.6);//can range from 0 - 10, inclusive
player.stats.set("Dodge", 0);//can range from 0 - 1, not inclusive

player.punchCost = 30;
player.slashCost = 40;
player.punchAcc = .9;
player.slashAcc = .7;
player.maxHealth = 10;
player.lastAction = 0;

var currentEnemy = {};

function hasOwnProperty(obj, prop) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop]);
}

if ( Object.prototype.hasOwnProperty ) {
    var hasOwnProperty = function(obj, prop) {
        return obj.hasOwnProperty(prop);
    }
}

function version(){
    return "1.03"
}

function updateStats(){

    var qualifiers = ["A","A Qualified","A Skilled","A Seasoned"]
    var expLevels = ["Fledgling","Rookie","Junior","Experienced","Veteran","Legendary"];

    var qual = qualifiers[(game.level+3) % 4];
    var expTitle = expLevels[Math.floor((game.level-1) / 4)];

    $("#title").text(qual + " "+expTitle +" Adventurer");

    $("#stat-box").html("<b>Stats</b>");
    player.stats.forEach(printToStats);
}

function printToStats(value, key, map){
    if(key == "Strength"){
        $('#stat-box').append("<br/>"+key+": "+value.toFixed(0));
    }else if(key == "Accuracy"){
        $('#stat-box').append("<br/>"+key+": "+value.toFixed(2));
    }else if(key == "Stamina"){
        $('#stat-box').append("<br/>"+key+": "+value.toFixed(2)*100+"%");
    }else if(key == "Health"){
        $('#stat-box').append("<br/>"+key+": "+value.toFixed(0)+"/"+player.maxHealth.toFixed(0));
    }else{
        $('#stat-box').append("<br/>"+key+": "+value);
    }    
}

//check button press
function checkBP(command){
    if(command == ""){
        $("#b1").text("Attack");
        $("#b2").text("Taunt");
        $("#b3").text("Wait");
        $("#b4").text("").hide();
        $("#b5").text("").hide();
    }
}

function enemyEncounter(){
    currentEnemy.health = 2;
    currentEnemy.name = "rat";
    currentEnemy.stats = new Map();
    currentEnemy.stats.set("strength", 1);
    currentEnemy.stats.set("accuracy", .6);
    currentEnemy.stats.set("dodge", 0);
    printToLog("<b>Level "+game.level+"</b> <br/>You encounter an enemy.")
}

function hit(acc, dodge){
    if(Math.random() < (acc * (1-dodge))){
        return true;
    }
    return false;
}
function printToLog(text){
    $('#log').append("<br/>"+ text);
}
$(document).ready(function(){

    function pressToAdvance(){
        $("button").hide();
        $("#pressToAdvance").text("Continue");
        $("#pressToAdvance").show();
    }

    function returnToMain(){
        $("button").hide();
        $(".opt1").show();
        game.currentOptions = 1;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    }

    function debug(){
        var debugFlag = true;
        if(debugFlag == true){
            console.log(currentEnemy);
        }
    }
    //return true if enemy defeated/new level
    //will reveal buttons depending on outcome: 
    //enemy alive, reveal opt1
    //enemy dead, reveal opt0 with next level
    //
    function enemyTurn(pAction){

        if(currentEnemy.health <= 0){
            $("button").hide();
            $(".opt0").text("Next level");
            $(".opt0").show();
            printToLog("You defeated "+currentEnemy.name+"!");

            player.maxHealth = 1.2 * player.maxHealth;
            player.stats.set("Health",1.2*player.stats.get("Health"));

            updateStats();
            return true;
        }

        enemyAttack();
        returnToMain();
        updateStats();
        return false;
    }

    function enemyAttack(){
        var dmg = currentEnemy.stats.get("strength");
        printToLog("The "+currentEnemy.name+" attacks!");
        if(hit(currentEnemy.stats.get("accuracy"), player.stats.get("Dodge"))){
            printToLog("You take "+dmg+" damage.");
            player.stats.set("Health", player.stats.get("Health") - dmg);
        }else{
            printToLog("The "+currentEnemy.name+" missed.");
        }
    }

    $("button").hide();
    $(".opt0").show();
    $(".keepdown").animate({ scrollTop: $(this).height() }, "slow");

    $(".opt0").click(function(){
        if(game.turn == 0){
            printToLog("<b>Welcome!</b><br/>This is a game where every action you make will affect your character in some way. For example, the more often you punch, the more accurate and strong your punches will be! <br/>");
            
            $("#b1").text("Got it");
            $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
        }
        if(game.turn == 1){
            enemyEncounter();
            $(".opt0").hide();
            $(".opt1").show();
            $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
        }
        if(game.turn > 1){
            game.level++;
            enemyEncounter();
            returnToMain();
        }
    });

    //all buttons
    $("button").click(function(){
        game.turn++;
        $("button").attr("disabled",true);
        setTimeout(function(){
            $("button").removeAttr("disabled")
        },250);
        if(game.turn>1) updateStats();
    });

    //continue button
    $("#pressToAdvance").click(function(){
        
        enemyTurn(player.lastAction);
        $("#pressToAdvance").hide();
        // $(".opt1").show();
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
        // game.currentOptions = 1;
    })

    //back button
    $("#b0").click(function(){
        $(".opt"+game.currentOptions.toString()).hide();
        $(".opt1").show();
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
        game.currentOptions = 1;
    })

    //start
    $("#b1").click(function(){
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
        game.currentOptions = 1;
    })

    //attack
    $("#b10").click(function(){
        //printToLog(">attack")
        $(".opt1").hide();
        $(".opt2").show();
        game.currentOptions = 2;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    })

    //taunt
    $("#b11").click(function(){
        //printToLog(">taunt")
        $(".opt1").hide();
        $(".opt4").show();
        game.currentOptions = 4;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    })

    //wait
    $("#b12").click(function(){
        //printToLog(">wait")
        $(".opt1").hide();
        $(".opt3").show();
        game.currentOptions = 3;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    })

    //punch
    $("#b100").click(function(){
        var dmg = 2*player.stats.get("Strength");
        printToLog(">punch");

        if(player.stats.get("Stamina") - )
        if(hit(player.stats.get("Accuracy"),currentEnemy.stats.get("dodge"))){
            printToLog("Enemy takes "+dmg+" damage.");
            currentEnemy.health -= dmg;
        }else{
            printToLog("You swung and missed!");
        }
        
        debug();
        pressToAdvance();

        player.lastAction = 100;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    })

    //slash
    $("#b101").click(function(){
        //TODO use a damage modifier depending on how many times slash has been used
        var dmg = 4*player.stats.get("Strength");
        printToLog(">slash");

        //TODO use an accuracy modifier dependent on times used
        //call hit function to see if attack should go through
        if(hit(.8*player.stats.get("Accuracy"),currentEnemy.stats.get("dodge"))){
            printToLog("Enemy takes "+dmg+" damage.");
            currentEnemy.health -= dmg;
        }else{
            printToLog("You swung and missed!");
        }

        pressToAdvance();
        player.lastAction = 101;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    })

    //examine
    $("#b110").click(function(){
        
        printToLog(">examine");
        var statAry = Array.from(currentEnemy.stats);
        var randNum = Math.floor(Math.random()*statAry.length);
        var stat = statAry[randNum][0];
        var value = statAry[randNum][1];
        printToLog("The "+currentEnemy.name+" has " + currentEnemy.health + " health and "+stat+" of "+value+".")

        pressToAdvance();
        player.lastAction = 110;
        $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
    })

});