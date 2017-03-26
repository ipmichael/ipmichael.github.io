function militarySitMap(){
	var sm = new Map();
	sm.set("peace",{
		speak: "I think we should increase our military. We don't have enough soldiers...",
		yes: "Go for it.",
		no: "Nah",
		yesFn: function(){

		},
		noFn: function(){

		}
	});
	sm.set("peace2",{
		speak: "I think " + advisors[1].name + " is taking some money from the treasury. How about I smack 'em around a bit?",
		yes: "Go for it.",
		no: "Nah",
		yesFn: function(){
			advisors[1].favor--;
		},
		noFn: function(){

		}
	})

	return sm;
}
function economicSitMap(){
	var sm = new Map();
	sm.set("peace",{
		speak: "I just got an interesting business deal from my friend in Algonquia. It involves... labor as an export.",
		yes: "Go for it.",
		no: "Uh we are not doing slavery",
		yesFn: function(){

		},
		noFn: function(){
			
		}
	});
	sm.set("peace2",{
		speak: advisors[2].name + " is holding too many celebrations. We don't have money for that.",
		yes: "No more holidays!",
		no: "I like to party",
		yesFn: function(){

		},
		noFn: function(){

		}
	});

	return sm;
}
function culturalSitMap(){
	var sm = new Map();
	sm.set("peace",{
		speak: "It's about time we held a lunar festival. I'll get the lanterns!",
		yes: "Go for it.",
		no: "Ain't nobody got time for that",
		yesFn: function(){
			
		},
		noFn: function(){
			
		}
	});
	sm.set("peace2",{
		speak: advisors[0].name + " is too aggressive. I can't plan parties with all this ruccus.",
		yes: "I'll take care of it",
		no: "But I need my armies",
		yesFn: function(){

		},
		noFn: function(){

		}
	});

	return sm;
}
function scienceSitMap(){
	var sm = new Map();
	sm.set("peace",{
		speak: "I may have stumbled on some incredible ancient research. I only need a few test subjects.",
		yes: "Go for it.",
		no: "Let me consult the IRB",
		yesFn: function(){

		},
		noFn: function(){
			
		}
	});
	sm.set("peace2",{
		speak: advisors[0].name + " could really benefit from this weapon I'm developing, just need some funding.",
		yes: "Go for it.",
		no: "Nah",
		yesFn: function(){

		},
		noFn: function(){

		}
	});

	return sm;
}