$(document).ready(function(){
    $(".keepdown").animate({ scrollTop: $(this).height() }, "slow");
    // handle input
    $("input").on("keydown",function search(e) {
        if(e.keyCode == 13 && $("input").val()!=='') {
            var stringIn = $("input").val().replace(/<|>|"/g,"");
            processInput(stringIn);
            $("#logBox").prop({ scrollTop: $("#logBox").prop("scrollHeight") });
        }
    });
    function processInput(command){
        printToLog(">"+ command);
        $("#mainIn").val("");
        checkCommands(command);
                
    }
});

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
    return "1.01"
}

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

function printToLog(text){
    $('#log').append("<br/>"+ text);
}

function printCommandList(){
    var allCommands = ['say ___','look at ___','look around','commands'];
    for(i = 0; i<allCommands.length; i++){
        printToLog(allCommands[i]);
    }
}