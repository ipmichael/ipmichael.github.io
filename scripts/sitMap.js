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
	})

	return sm;
}
function economicSitMap(){
	var sm = new Map();
	sm.set("peace",{
		speak: "Let's trade with Algonquia. We can give them a few slaves.",
		yes: "Go for it.",
		no: "Uh we are not doing slavery",
		yesFn: function(){

		},
		noFn: function(){
			
		}
	})

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
	})

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
	})

	return sm;
}

var militFunctions = {

}