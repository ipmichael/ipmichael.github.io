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
    $("button").hide();
    $("#fin").hide();
    $(".opt0").show();
    $("button").click(function(){
        game.turn++;
        $("button").attr("disabled",true);
        setTimeout(function(){
            $("button").removeAttr("disabled")
        },250);
    });

    $(".opt0").click(function(){
        if(game.turn == 1){
            printToLog("You begin as a humble villager with a great destiny. Go forth and discover it!");
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

var villageMap = new Map();

villageMap.set("",["You wake up to the sound of a loud horn. \"EVERYONE GET IN THE VILLAGE!\", yells the grandfatherly village chief. You figure it's just one of the kids again who's run too far off. In the recent years, the worst thing that's happened to this little farming village was a slight drought. \"There's a MONSTER outside! Protect the women and children!\"",
    "Run outside your hut","Go back to sleep"]);
//run outside
villageMap.set("0",["You run outside your hut. Screams fill the air and you're almost knocked over by people running up and down the path. Villagers scramble to collect their children and slam the doors to their huts shut.","Look for a weapon","Go outside the village","Find the village chief","Cry"]);
//go back to sleep
villageMap.set("1",["Whatever it is, it's nothing the village men can't handle. It's just one beast. You close your eyes and go back to sleep.","..."]);
//go outside the village
villageMap.set("01",["You sprint outside the village, in pretty much the opposite direction of everyone else. As you near the village walls, you hear more screaming and see what appears to be a large bear with dimly glowing red eyes and dark maroon fur bent over a fallen villager's body.","Approach slowly","Run away!","Attack!"]);
//approach slowly
villageMap.set("010",["You take small, careful steps towards the feasting monster. It breathes heavily between big chomps of its meal - one of the village men. The fallen villager's armor is a few feet away, torn off and bloodied, and his sword still in his grip. The bear-like creature has large claws and two full rows of glistening teeth, dripping with blood. As you get close enough to almost touch it, it lashes around towards you and snarls angrily.","Grab the sword and fight","Run away!"]);
//run away!
villageMap.set("011",["Terrified, knees shaking and questioning why you didn't think to bring a weapon, you desperately scramble to get back into the village. The beast snarls and cuts you off, eyes glowing more brightly red than before. It starts to approach you...","Run!","Attack!"]);
//RUN!
villageMap.set("0110",["You turn around and run for your life. For as long as you can remember, you've never gone more than a mile from the village walls, but you have a feeling you might have to go further than that. You see the city, Copta, about three miles out and you continue to run. Eventually you no longer hear the beast behind you - it must've gotten distracted by the other villagers or returned to its meal.","Stay the night in Copta","Make your way back to the village"]);
//attack w/ no weapon
villageMap.set("012",["You have no regard for your own mortality, so you launch yourself at the beast. It promptly bites your head off, and you die."]);
villageMap.set("0111",["You have no regard for your own mortality, so you launch yourself at the beast. It promptly bites your head off, and you die."]);
//grab sword and fight
villageMap.set("0100",["You grab the sword! Trembling, you swing blindly at the beast. You've never really handled a sword before, but you swing for your life anyways. The beast's eyes glow more brightly crimson than before as it slashes at you angrily. You manage to get enough out of reach to only suffer a gash in your arm. The village chief and a few other villagers arrive, armor clad and ready to fight.","..."]);
villageMap.set("01000",["Drawn by the clanging of the newcomers metal, the beast turns around and swings at the village chief, sending him flying. With the beast's back towards you, you decide to...","Finish off the monster", "Run to the village chief","Attack the other villagers"]);
//Finish off the monster
villageMap.set("010000",["Your adrenaline is rushing and blood is pumping. You muster all of your strength to charge you sword straight into the beast's back. The sword meets heavy resistance, making a queasy gushing sound as it slides half a foot into the beast. The creature roars loudly and begins to turn towards you before whimpering and collapsing. Panting and in pain from the wound on your arm, you take a moment to collect your breath and draw the sword back out of the beast. \"Incredible!\", exclaims one of the other villagers. They let out whoops of joy.","See how the chief is doing", "Go back into your hut to rest","Attack the other villagers"]);
//run to chief (beast still alive)
villageMap.set("010001",["You run over to the village chief. He has an enormous gash in his heaving chest and he's having difficulty breathing. Given his age and the severity of his wounds, it's clear he doesn't have much time. \"I... need...\", he mutters before coughing up blood. He looks into your eyes and says, \"Your parents... they never...\" before taking his last breath. Meanwhile, the beast has been slain by the other villagers. Sensing that things have calmed down, more villagers rush out to tend to the wounded.","Go back to your hut to rest"]);
//look for a weapon
villageMap.set("00",["You look around for a weapon. There are some swords and metal things hanging from the blacksmith's rack, but he's not known to take kindly to thieves. You also notice a rusty cattle prod lying on the path - no one would miss that.","Mosey on over to the rack","Pick up the cattle prod","Don't want a weapon"]);
//stroll over to the blacksmith's rack
villageMap.set("000",["You stroll over as inconspiciously as possible to the blacksmith's rack, making furtive glances and taking care to not attract any unnecessary attention. Looks like the old man isn't around. Sneaking your way past the oven, a few anvils and some miscellaneous tools, you make your way to the medium sized rack on the wall. Now, to choose a weapon...","Heavy blade","Small dagger","Blacksmith's hammer","Don't want a weapon"]);
//heavy blade
villageMap.set("0000",["Your eyes are drawn to the shiny, newly forged steel sword with a rather large blade. The hilt has the blacksmith's family insignia on it. You pull it off the rack. It's suprisingly heavy - you'll have to wield it with both hands.","Go outside","Put it back and check out the dagger","Put it back and check out the blacksmith's hammer","Don't want a weapon"]);
//small dagger
villageMap.set("0001",["You shift your glance to what looks like an assassin's blade. It's nothing fancy, but it's small, pointy and would be easy to keep in your belt.","Go outside","Put it back and check out the sword","Put it back and check out the blacksmith's hammer","Don't want a weapon"]);
//blacksmith's hammer
villageMap.set("0002",["You pick up the blacksmith's hammer and like the weight of it. The grip is well worn from use and you could swing it with one hand. You're not exactly adept with a blade, but you figure you could do decent damage with a hammer.","Go outside","Put it back and check out the dagger","Put it back and check out the sword","Don't want a weapon"]);
//no weapon
villageMap.set("000",["You stroll over as inconspiciously as possible to the blacksmith's rack, making furtive glances and taking care to not attract any unnecessary attention. Looks like the old man isn't around. Sneaking your way past the oven, a few anvils and some miscellaneous tools, you make your way to the medium sized rack on the wall. Now, to choose a weapon...","Heavy blade","Small dagger","Blacksmith's hammer","Don't want a weapon"]);
//pick up the cattle prod
villageMap.set("001",["You grab the cattle prod. After all, there's no time for sneaking around the blacksmith's shop. You hear a ferocious roar followed by blood-curdling shrieking from just beyond the village walls.","Run outside the village","Find the village chief"]);
//find the village chief
villageMap.set("02",["You run outside and look for the village chief. You scan the crowds of people frantically scrambling into their huts... until eventually you find the chief fumbling into his war gear.","\"How can I help?\"","Sneak into his hut","Knock him out"]);
//cry
villageMap.set("03",["Hearing the sound of the monster roaring, you fall to the ground and bawl. Pathetically. Tears stream down your face and you have flashbacks to your childhood, when your parents were mauled outside these village walls by a monster.","Drown in your tears","Look for a weapon","Go outside the village","Find the village chief"]);
//drown in your tears
villageMap.set("030",["You just lay there on the ground, clutching your knees and crying while the monster continues to attack the village. A few hours and many valiant villager lives later, the monster is killed - but not before it eats you."]);
//... 
villageMap.set("10",["You wake up and it's almost dark outside.","Go back to sleep","Go outside"]);
//going outside at night
villageMap.set("101",["You crawl outside your hut. Over by the village gate you can see streaks of blood and mangled fur where the villagers must've fought with the monster. The village is relatively quiet, with the exception of a few villagers chatting by the bonfire at the center of the village.","Go to the bonfire","Sneak around the village", "Leave the village"]);
//going back to sleep 2
villageMap.set("100",["You go back to sleep, again.","..."]);
//waking up from sleep
villageMap.set("1000",["You wake up, and it's day time. You hear a low growling outside your hut.","Go outside","Stay put"]);

function advanceStory(){
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

    var ary = villageMap.get(game.state);
    if(ary == null){
        $("button").hide();
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