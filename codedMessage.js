/**
 * Created by Yaelle on 09/06/2017.
 */

var msg = "09aZ";

var msg_binary = [];

var tick = new Audio('tick.wav');
var beep = new Audio('beep.wav');
var win = new Audio('win.mp3');
var lose = new Audio('lose.wav');

var challengeWon = false;

// Set the date we're counting down to
var countDown = 0.5 * 60 * 1000;
var countDownTo = new Date().getTime() + countDown;

// Update the count down every 1 second
var bombTicking = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownTo - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var zeroMin = (minutes < 10)? "0" : "";
    var zeroSec = (seconds < 10)? "0" : "";

    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML =
        zeroMin + minutes + ":" + zeroSec + seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        if (!challengeWon) {
            lose.play();document.getElementById("answer").innerHTML +=
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/>"+
                "~~~~~ SORRY :'( YOU FAILED ... ~~~~~<br/>"+
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/><br/>";
        } else {
            document.getElementById("answer").innerHTML +=
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/>"+
                "~~~~~ SORRY :'( ... No More Time! ~~~~~<br/>"+
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/><br/>";

        }
        document.getElementById("timer").innerHTML = "00:00";

        clearInterval(bombTicking);
        clearInterval(msgLoop);
    }
}, 1000);


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
}


var letter = 0;
var index = 0;
var cursor = document.getElementById("cursor");
// play message in loop
var msgLoop = setInterval(function() {
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
    cursor.style.display = (cursor.style.display == 'none' ? '' : 'none');
}, 1000);

var indexCode = 0;
// deal with user input
document.onkeypress = function (e) {
    e = e || window.event;
    indexCode++;

    var code = document.getElementById("code");

    // enter
    if (e.keyCode === 13)
    {
        if (code.innerHTML === msg && !challengeWon)
        {
            win.play();
            var play3times = 3;
            var player = setInterval(function(){
                if(play3times > 0){
                    win.play();
                    play3times --;
                }
                else clearInterval(player)
            }, 1300);
            document.getElementById("answer").innerHTML +=
                "C:\\Users\\Hope\\SaveTheWorld > " + code.innerHTML + "<br/><br/>";
            document.getElementById("answer").innerHTML +=
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/>"+
                "~~~~~ WELL DONE! YOU SAVED THE WORLD !!! ~~~~~<br/>"+
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/><br/>"+
                "Ask nicely and I might just give you the code for the bonus box... <br/><br/><br/>";
            //clearInterval(bombTicking);
            clearInterval(msgLoop);
            code.innerHTML = "";
            challengeWon = true;

            var bonusLoop = setInterval(function() {
                cursor.style.display = (cursor.style.display == 'none' ? '' : 'none');
            }, 1000);
        }
        else if (code.innerHTML !== msg && !challengeWon) {
            document.getElementById("answer").innerHTML +=
                "C:\\Users\\Hope\\SaveTheWorld > " + code.innerHTML + "<br/><br/>";
            code.innerHTML = "";
        }
        // challenge already won... onto bonus task
        else
        {
            if (code.innerHTML.indexOf("please") !== -1)
            {
                document.getElementById("answer").innerHTML +=
                "C:\\Users\\Hope\\SaveTheWorld > " + code.innerHTML + "<br/>"+
                    "You are using your language, that's not nice! Make an effort and use mine... I just want one word!<br/><br/>";
                code.innerHTML = "";
            }
            if (code.innerHTML.indexOf("011100000110110001100101011000010111001101100101") !== -1
            || code.innerHTML.indexOf("01110000 01101100 01100101 01100001 01110011 01100101") !== -1)
            {
                document.getElementById("answer").innerHTML +=
                    "C:\\Users\\Hope\\SaveTheWorld > " + code.innerHTML + "<br/>"+
                    "That's so polite! Here goes what you are looking for: <br/>517<br/><br/>";
                code.innerHTML = "";
                clearInterval(bonusLoop);
            }
            else
            {
                // convert binary to ascii char and print translation
                var chars = code.innerHTML.match(/.{1,8}/g);
                var textTranslated = "";

                for (var ic=0 ; ic < chars.length ; ic++)
                {
                    textTranslated += binToText(chars[ic]);
                }

                document.getElementById("answer").innerHTML +=
                    "C:\\Users\\Hope\\SaveTheWorld > " + code.innerHTML + "<br/>"+
                    "Nope, '"+textTranslated+"' is not what I was expecting...<br/>";
                code.innerHTML = "";
            }
        }
    }
    // backspace
    else if (e.keyCode === 8)
    {
        //console.log("erase");
       // code.innerHTML = code.innerHTML.slice(0, -1);
    }
    else
    {
        var letter = String.fromCharCode(e.keyCode);
        code.innerHTML += letter;
    }


};

document.onkeyup = function (e) {
    if (e.keyCode === 8)
    {
        code.innerHTML = code.innerHTML.slice(0, -1);
    }
};

function binToText(input) {
    var text = String.fromCharCode(parseInt(input,2).toString(10));
    return text;
}