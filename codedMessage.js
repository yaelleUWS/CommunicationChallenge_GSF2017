/**
 * Created by Yaelle on 09/06/2017.
 */

var msg = "09aZ";

var msg_binary = [];

var tick = new Audio('tick.wav');
var beep = new Audio('beep.wav');


// calculate binary version of message
for (var i = 0, len = msg.length; i < len; i++) {
    var binaryLetter = msg[i].charCodeAt(0).toString(2).split('');

    // complete array with zeros in front to make up 8 bits
    var toadd = 8 - binaryLetter.length;
    for (var j=0 ; j < toadd ; j++)
    {
        binaryLetter.unshift("0");
    }

    msg_binary.push(binaryLetter);

    console.log(msg_binary);
}


var letter = 0;
var index = 0;
// play message in loop
setInterval(function() {
    if (letter === 0 && index === 0)
    {
        document.getElementById("flash").style.display = 'none';
        beep.play();
    } else {
        if (msg_binary[letter][index] === '0')
        {
            document.getElementById("flash").style.display = 'none';
        } else {
            document.getElementById("flash").style.display = 'block';
        }

        tick.play();
    }

    if(index === 8)
    {
        if (letter === msg_binary.length -1)
        {
            letter = 0;
        } else {
            letter++;
        }
        index  = 0;
    } else {
        index++;
    }
}, 1000);
