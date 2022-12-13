var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    //when a button is clicked this will select the button attibute by id 
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
    
});



function nextSequence() {
    //. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

   //. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

    //this will randomly select numbers from 1-3
    var randomNumber = Math.floor(Math.random()* 4);
    //this will pick the buttoncolors randomly 
    var randomChosenColour = buttonColors[randomNumber]; 
    //this will push the selected randomcolor into the empty gamepattern array
    gamePattern.push(randomChosenColour);

        //this will select the id of each randomchosencolor and make it fadein,fadeout and fadein
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(curentColour) {
    //this will select the id then add currentcolor and replace it with the CSS class called pressed
    $("#" + curentColour).addClass("pressed");
    //this will set a timer and remove the pressed class
    setTimeout (function (){
        $("#" + curentColour).removeClass("pressed");
    }, 100);
}

//this will help to play the sounds 
function playSound (name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
