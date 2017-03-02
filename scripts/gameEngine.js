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
        // var d1 = new $.Deferred();
        printToLog(">"+ command);
        $("#mainIn").val("");
        checkCommands(command);
    }
});

// function writeText(content, callback) {
//     var contentArray = content.split("");
//     var current = 0;
//     // this.append("<br/>");
//     setInterval(function() {
//         if(current < contentArray.length) {
//             // elem.text(elem.text() + contentArray[current++]);
//             this.append(contentArray[current++] + current);
//         }
//     }, 100);
// }

// (function($) {
//     $.fn.writeText = function(content) {
//         var contentArray = content.split(""),
//             current = 0,
//             elem = this;
//         setInterval(function() {
//             if(current < contentArray.length) {
//                 this.append(contentArray[current++] + current);
//             }
//         }, 100);
//     };
    
// })(jQuery);

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
    return "1.02"
}

function printToLog(text){
    $('#log').append("<br/>" + text);
    // $('#log').writeText(text);
    // _callback();
}

function printCommandList(){
    var allCommands = ['say ___','look at ___','look around','commands'];
    for(i = 0; i<allCommands.length; i++){
        printToLog(allCommands[i]);
    }
}