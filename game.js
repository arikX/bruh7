var level = 0;
var started = false;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue" , "green" , "yellow"];
function nextSequence() {
     userClickedPattern = [];
     level++;
     $("#level-title").text("Level " + level);

   var randomNumber = Math.floor(Math.random() *buttonColors.length);
   var randomChosenColor = buttonColors[randomNumber]; // First you pick the array itself, then the number/location of the number that you want, in this case it is the random number chosen (1-4) that is inside the array buttonColors
   gamePattern.push(randomChosenColor);
   $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);

}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound (name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress (currentColor) {
  var button = $("#" + currentColor);
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 1000);
}


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
      console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
    }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  }
