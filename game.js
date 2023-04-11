var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userChosenColor = [];
var currentLevel = 0;
var gameOver = false;

$("body").keypress(function (event) {
    if (event.key === "a") {
        nextSequence();
    }
    if (gameOver) {
        $("body").keypress(function () {
            gameOver = false
            nextSequence()
        })
    }
})

function nextSequence() {
    currentLevel++;
    $("h1").text("Level " + currentLevel)

    var randomNumber = Math.floor(Math.random() * 4)
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer() {
    for (i = 0; i < userChosenColor.length; i++) {
        if (gamePattern[i] == userChosenColor[i]) {
        } else {
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            gamePattern = [];
            userChosenColor = [];
            currentLevel = 0;


            $("body").addClass("game-over")
            setTimeout(
                function () {
                    $("body").removeClass("game-over")
                }, 200)
            $("h1").text("Game Over, Press Any Key to Restart")
            gameOver = true
            break
        }
    }
}

$(".btn").click(function () {
    var audio = new Audio("sounds/" + this.id + '.mp3');
    audio.play();
    animatePress(this.id)
    userChosenColor.push(this.id);
    checkAnswer()

    if (userChosenColor.length == gamePattern.length) {
        setTimeout(
            function () {
                if (!gameOver) {
                    nextSequence()
                }
            }, 1000)
        userChosenColor = [];
    }
})

$("#" + randomChosenColor).click(function () {
    $(this).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
})