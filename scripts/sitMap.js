function militarySitMap(){
	var sm = new Map();
	sm.set("peace",{
		type: "Military",
		speak: "I think we should increase our military. We don't have enough soldiers...",
		yes: "Go for it.",
		no: "Nah",
		yesFn: function(){
			var numToConv = Math.floor(statMap.get("Population")/3);
			modStat("Population", -1*numToConv, false);
			modStat("Army", numToConv, false);
		},
		noFn: function(){

		}
	});
	sm.set("peace2",{
		type: "Military",
		speak: "I think " + advisors[1].name + " is taking some money from the treasury. How about I smack 'em around a bit?",
		yes: "Go for it.",
		no: "Nah",
		yesFn: function(){
			advisors[1].favor--;
		},
		noFn: function(){

		}
	});
	sm.set("war0",{
		type: "Military",
		speak: "The northern territories are starting to expand. We should teach them a lesson.",
		yes: "Slaughter the bastards",
		no: "It's cool",
		yesFn: function(){
			var army = statMap.get("Army");
			if(army > 25){
				$("#c-text").append("<br/><i>you succeeded!</i>");
				modStat("Gold", 150, false);
				modStat("Morale", 5, false);
				modInf("Land",25, false);
			}else{

				$("#c-text").append("<br/><i>your army wasn't big enough</i>");
				modStat("Army", -50, false);
				modStat("Population", -50, false);
				modStat("Morale", -5, false);
			}
		},
		noFn: function(){

		}
	});

	return sm;
}
function economicSitMap(){
	var sm = new Map();
	sm.set("peace",{
		type: "Economic",
		speak: "I just got an interesting business deal from my friend in Algonquia. It involves... labor as an export.",
		yes: "Go for it.",
		no: "Uh we are not doing slavery",
		yesFn: function(){
			var numToConv = Math.floor(statMap.get("Population")/5);
			modStat("Population", -1*numToConv, false);
			modStat("Gold", numToConv*50, false);
			modStat("Morale", -15, false);
		},
		noFn: function(){
			
		}
	});
	sm.set("peace2",{
		type: "Economic",
		speak: advisors[2].name + " is holding too many celebrations. We don't have money for that.",
		yes: "No more holidays!",
		no: "I like to party",
		yesFn: function(){
			modStat("Morale", -10, false);
		},
		noFn: function(){
			modStat("Morale", 5, false);
			modStat("Gold", -1*infMap.get("Land"), false);
		}
	});
	sm.set("war0",{
		type: "Economic",
		speak: "We should build some more huts and fertilize more land. It may cost a bit and the construction may be deadly, but we'll benefit in the long run.",
		yes: "Infrastructure ftw",
		no: "Can't afford it right now",
		yesFn: function(){
			var army = statMap.get("Army");

			var popToConv = Math.floor(statMap.get("Population")/5);
			modStat("Population", -1*popToConv, false);
			modInf("Huts", Math.floor(popToConv/5), false);

			var goldToConv = Math.floor(statMap.get("Gold")/10);
			if(goldToConv < 50){
				italMsg("you needed at least 50 gold");
			}else{
				modStat("Gold", -1*goldToConv, false);
				modInf("Land", Math.floor(goldToConv/5), false);
			}
			
		},
		noFn: function(){

		}
	});
	return sm;
}
function culturalSitMap(){
	var sm = new Map();
	sm.set("peace",{
		type: "Cultural",
		speak: "It's about time we held a lunar festival. I'll get the lanterns!",
		yes: "Go for it.",
		no: "Ain't nobody got time for that",
		yesFn: function(){
			modStat("Morale", 5, false);
			modStat("Gold", .8, true);
		},
		noFn: function(){
			modStat("Morale", -5, false);
		}
	});
	sm.set("peace2",{
		type: "Cultural",
		speak: advisors[0].name + " is too aggressive. I can't plan parties with all this ruccus.",
		yes: "I'll take care of it",
		no: "But I need my armies",
		yesFn: function(){
			modStat("Morale", 5, false);
			modStat("Army", .9, true);
		},
		noFn: function(){

		}
	});
	sm.set("war0",{
		type: "Cultural",
		speak: "The northern territories will be won over if you just marry one of their princesses. Plus, the people love a royal wedding!",
		yes: "I'm getting married!",
		no: "Ew...",
		yesFn: function(){
			modStat("Morale", 10, false);
			modStat("Gold", -500, false);
		},
		noFn: function(){
			modStat("Army", -50, false);
		}
	});

	return sm;
}
function scienceSitMap(){
	var sm = new Map();
	sm.set("peace",{
		type: "Science",
		speak: "I may have stumbled on some incredible ancient research. I only need a few test subjects.",
		yes: "Go for it.",
		no: "Let me consult the IRB",
		yesFn: function(){
			modStat("Morale", -5, false);
			modStat("Population", .95, true);
			modInf("Research", 1, false);
		},
		noFn: function(){
			
		}
	});
	sm.set("peace2",{
		type: "Science",
		speak: advisors[0].name + " could really benefit from this weapon I'm developing, just need some funding.",
		yes: "Go for it.",
		no: "Nah",
		yesFn: function(){
			modStat("Gold", -200, false);
			modInf("Secret Weapon", 1, false);
		},
		noFn: function(){

		}
	});
	sm.set("war0",{
		type: "Science",
		speak: "Those northerners don't let up, do they? Let me try out my newest invention on those northern barbarians... Just make sure it doesn't leak onto our guys.",
		yes: "I'm all for science!",
		no: "That sounds sketchy",
		yesFn: function(){
			modStat("Morale", -5, false);
			modStat("Army", .9, true);
			modStat("Gold", 1.1, true);
			modInf("Huts", .9, true);
			modInf("Research",1,false);
		},
		noFn: function(){
			modStat("Army", .7, true);
			modStat("Population",.9,true);
		}
	});

	return sm;
}

function italMsg(txt){
	$("#c-text").append("<br/><i>"+txt+"</i>");
}