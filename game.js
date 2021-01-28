//  Vars
var gameRunning = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
// var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];





// Game Loop
$(".cta").click(function() {
  if (!gameRunning) {
    $(".cta").hide();
    gameRunning = true;
    $(".btn").removeClass("disabledbutton");
    nextSequence();
  }
});






//  When a player clicks a button play the corresponding sound and add that color to the player array
$(".btn").on("click", function() {
  if (gameRunning) {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern, gamePattern);
  }
});


//  FUNCTIONS:

//  Used to add a new color to the current sequence and increase the level and update the title text
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern.length = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  setTimeout(function() {
    displayPattern(0, gamePattern);
  }, 200);

}



//  Used to display the full pattern to the player
function displayPattern(index, array) {

  if (index >= array.length)
    return;

  $("#" + gamePattern[index]).fadeOut(150).fadeIn(150);
  playSound(gamePattern[index]);
  index++;
  setTimeout(displayPattern.bind({}, index, array), 400);
}


//  Play the correct sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



//  Add an animation when the player clicks a button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Check the user sequence against the game sequence
function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      console.log("Correct");
      continue;
    } else {
      console.log("Wrong");
      gameOver();
      break;
    }

  }
  if (userClickedPattern.length === gamePattern.length && gameRunning)
    setTimeout(function() {
      nextSequence();
    }, 800);

}









// Set the game over screen and wait for player to restart
function gameOver() {
  playSound("wrong");
  gameRunning = false;
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over");
  $(".cta").show();
  $(".cta").text("Try again");
  $(".btn").addClass("disabledbutton");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
