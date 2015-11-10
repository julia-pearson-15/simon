  //declaring variables for all buttons
  var $red;
  var $blue;
  var $yellow;
  var $green;

  var $highScore;
  var $currentScore;

  var $messageBar;
  //If this is true, it is the computer's turn
  var computer = true;

  //need an array that holds computer's random order
  //program will call clicked(on each element)
  var orderedClicks = [];
  //this array will house userClicks
  var userClicks = [];


  //blinks the button when clicked or called by computer clicks
  var clicked = function($element) {
    var noFlash = function() {
      $element.removeClass('flash');
      //check progress when we turn off flash
      if(! computer && (userClicks.length === orderedClicks.length)){
        compareClicks();
      } 
    }
    //making invisable for 150 mili-seconds
    var flash = function() {
      //should be: 'computer? false'
      //console.log('computer? '+computer);
      //adding element to user array if user is the one playing
      if(! computer){
        userClicks.push($element);
        $currentScore.text(userClicks.length);
        //should be 'at click 1,2,3,4,etc.'
        //console.log('at click '+userClicks.indexOf($element));
      }
      $element.addClass('flash');
      var beep = function(){
        if($element === $red){
          document.getElementById('red-hello').play();
        } else if($element === $blue){
          document.getElementById('blue-me').play();
        } else if($element === $green){
          document.getElementById('green-side').play();
        } else{
          document.getElementById('hello').play(); 
        } 
      }
      beep();
      setTimeout(noFlash, 150);  
      // ! add sound effect  
    }
    return flash;
  }

  //add a random element to the ordered clicks array
  var addToSequence = function() {
    var randomColor = Math.floor(Math.random() * 3);
    //0=red
    if(randomColor === 0){
      //0=red
      orderedClicks.push($red);
    }else if(randomColor === 1){
      //0=blue
      orderedClicks.push($blue);      
    }else if(randomColor === 2){
      //0=yellow
      orderedClicks.push($yellow);      
    }else if(randomColor === 3){
      //0=green
      orderedClicks.push($green);      
    }
  }

  var userTurnAlert = function(){
      $messageBar.text('Your turn!');
      //alert('your turn!');
      computer = false;
      $red.on('click', clicked($red));
      $blue.on('click', clicked($blue));
      $yellow.on('click', clicked($yellow));
      $green.on('click', clicked($green));
  }

  //need func that reads orderedClicks array and calls clicked() on it
  var runOrderedClicks = function() {
    $messageBar.text('');
    var i = 0;
    for (i = 0; i < orderedClicks.length; i++) {
      setTimeout(clicked(orderedClicks[i]), (i + 1) * 1000);
    };
    setTimeout(userTurnAlert,(i + 1) * 1000);
  }  

  var started = function(){
    $start.addClass('animated');
    $start.addClass('pulse');
    userClicks = [];
    orderedClicks = [];
    addToSequence();  
    computer = true;
    //alert('GET READY');
    //start displaying the button's glow after 1 second
    $messageBar.text('Computer is Playing...');
    setTimeout(runOrderedClicks,2000);
    $start.off();
  }

  //need func that cuts out event listeners when player gets order wrong
  var lost = function() {
    $red.off();
    $blue.off();
    $yellow.off();
    $green.off();
    $messageBar.text('You lost! Try Again! Press Start');
    //alert('you lost!');
    $currentScore.text(0);
    $currentScore.addClass('flip');
    $currentScore.addClass('animated');
    $start.on('click', started); 
  }

  var compareClicks = function() {
      var moveOn = true;
      for (var i = 0; i < orderedClicks.length; i++) {
        if(orderedClicks[i] !== userClicks[i]){
          moveOn = false;
        }
      }
      if(moveOn) {
        //clears user clicks
        $highScore.text(userClicks.length);
        //console.log($highScore.val());
        $messageBar.text('you get to move on!');
        // alert('you get to move on!');
        userClicks = [];
        computer = true;
        $red.off();
        $blue.off();
        $yellow.off();
        $green.off();
        addToSequence();
        $messageBar.text('Computer is Playing...');
        setTimeout(runOrderedClicks, 2000);
      }else{
        lost();
      }
  }


$(document).ready(function() {
  //assigning variables to HTML elements
  $red = $('#red');
  $blue = $('#blue');
  $yellow = $('#yellow');
  $green = $('#green'); 
  $start = $('#start');
  $highScore = $('#actual-score');
  $currentScore = $('#current-score');
  $messageBar = $('#message-bar');
  $messageBar.addClass('animated');
  $messageBar.addClass('zoomInRight');
  //Beginning game with item in array


  //gets game started when start button pressed
  $start.on('click', started); 

  //ready for user clicks!

});





