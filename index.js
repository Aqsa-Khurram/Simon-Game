const buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).animate({ opacity: 0.2 }, 500).animate({ opacity: 1 }, 500);
    var audio = new Audio('./sounds/' + randomChosenColor + '.mp3');
    audio.play();
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    var audio = new Audio('./sounds/' + userChosenColor + '.mp3');
    audio.play();
    $("#" + userChosenColor).animate({ opacity: 0.2 }, 500).animate({ opacity: 1 }, 500);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio('./sounds/wrong.mp3');
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);
        audio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keypress(function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});
