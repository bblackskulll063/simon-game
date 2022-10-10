var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatepress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
});



// functions of Sound , Animation & comparasion

function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] ===userClickPattern[currentlevel] ){
        if(userClickPattern.length === gamePattern.length) 
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        
    }
    else
    {
        gameover();
        startover();
    }
}

function nextSequence() {
    userClickPattern = [];
    level++;

    $("#level-title").text("Level - " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function gameover() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () { $("body").removeClass("game-over"); }, 200);

}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatepress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function startover() {
    level = 0;
    gamePattern = [];
    started = false;
}





