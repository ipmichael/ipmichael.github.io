function NPC(name, location, desc){
    this.name = name;
    this.location = location;
    this.desc = desc;
}

var hut1 = new NPC('hut1',village,'You see a small hut.')
var hut2 = new NPC('hut2',village,'You see a medium sized hut.')
var booger = new NPC('booger',village,'')

var village = new Object();
village.lookedAt = 'the village where you grew up. It seems small.';
village.desc = 'There\'s not much besides a few old huts.';
village.residents = [hut1, hut2];

var player = new Object();
player.lookedAt = 'you. Looking good.';
player.desc = 'Looking good.';
player.location = village;

aliasMap = new Map();
aliasMap.set('me',player);
aliasMap.set('myself',player);
aliasMap.set('I',player);
aliasMap.set('village',village);
aliasMap.set('the village',village);
aliasMap.set('hut',hut1);
aliasMap.set('the hut',hut1);
aliasMap.set('small hut',hut1);
aliasMap.set('the small hut',hut1);
aliasMap.set('medium hut',hut2);
aliasMap.set('the medium hut',hut2);
aliasMap.set('big hut',hut2);
aliasMap.set('the big hut',hut2);
aliasMap.set('bigger hut',hut2);
aliasMap.set('the bigger hut',hut2);

function checkCommands(command){
    if(command.search(/say .+/i)!= -1){
        var regex = /say (.+)/i;
        var match = regex.exec(command);
        printToLog("You say \""+match[1]+"\".");
        return true;
    }else if(command.search(/commands/i)!= -1){
        printCommandList();
        return true;
    }else if(command.search(/look at .+/i)!= -1){
        var regex = /look at (.+)/i;
        var match = regex.exec(command);
        aliasMap.forEach(function(obj, alias){
            if(match[1].toUpperCase() == alias.toUpperCase()){
                if(hasOwnProperty(obj,'desc')){
                    printToLog(obj.desc);
                    return true;
                }
            }
        });
    }else if(command.search(/look around/i)!= -1){
        var regex = /look around/i;
        if(hasOwnProperty(player.location,'desc')){
            printToLog(player.location.desc);
            var allRes = '';
            player.location.residents.forEach(function(res){
                printToLog(res.desc);
            });
            return true;
        }
    }else{
        printToLog("almost got it")
    }

    return false;
}