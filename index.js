var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;
var i = 0;


// Starting the game 
$(document).on("keydown", function(event) {
    
    if (event.key === "a" && started === false) {
        setTimeout(()=>{
            nextSequence();
        }, 1000)
        started = true;
        $("#level-title").text("Level " + level);
    };

});




// Adding the buttons clicked by user 
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});





// Random sequence generated by computer 
function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + level);
};



// Playing sound corresponding to the function call 
function playSound(name) {
    var userClickedSound = new Audio("sounds/" + name + ".mp3");
    userClickedSound.play();
};


// Add animation to user clicks 
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
      setTimeout(()=>{
    $("#" + currentColor).removeClass("pressed")
    }, 100);
};





//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong")
      $("body").addClass("game-over")
      setTimeout(()=>{
        $("body").removeClass("game-over")
      }, 200)
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $(document).on("keydown", function(){
        startOver()
      })
    }

}


// Start over 
function startOver() {
    $("#level-title").text("Press A Key to Start")
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}