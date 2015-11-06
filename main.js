  //declaring variables for all buttons
  var $red;
  var $blue;
  var $yellow;
  var $green;

  var $highScore;

  //If this is true, it is the computer's turn
  var computer=true;

  //need an array that holds computer's random order
  //program will call clicked(on each element)
  var orderedClicks = [];
  //this array will house userClicks
  var userClicks = [];

  var beep = function(){
    document.getElementById('beepTime').play();
  }

  //blinks the button when clicked or called by computer clicks
  var clicked = function($element) {
    var noFlash = function() {
      $element.removeClass('flash');
      //check progress when we turn off flash
      if(!computer && (userClicks.length === orderedClicks.length)){
        compareClicks();
      } 
    }
    //making invisable for 150 mili-seconds
    var flash = function() {
      //should be: 'computer? false'
      console.log('computer? '+computer);
      //adding element to user array if user is the one playing
      if(!computer){
        userClicks.push($element);
        //should be 'at click 1,2,3,4,etc.'
        console.log('at click '+userClicks.indexOf($element));
      }
      $element.addClass('flash');
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
    if(randomColor===0){
      //0=red
      orderedClicks.push($red);
    }else if(randomColor===1){
      //0=blue
      orderedClicks.push($blue);      
    }else if(randomColor===2){
      //0=yellow
      orderedClicks.push($yellow);      
    }else if(randomColor===3){
      //0=green
      orderedClicks.push($green);      
    }
  }

  var userTurnAlert = function(){
      alert('your turn!');
      computer=false;
  }

  //need func that reads orderedClicks array and calls clicked() on it
  var runOrderedClicks = function() {
    var i=0;
    for (i = 0; i < orderedClicks.length; i++) {
      //should be:  'computer? true, at index: 1,2,3,4,etc.'
      console.log('computer? '+computer+", at index: "+i)
      setTimeout(clicked(orderedClicks[i]), i*700);
    };
    setTimeout(userTurnAlert,i*700);
  } 

  //need func that cuts out event listeners when player gets order wrong
  var lost = function() {
    $red.off('click', clicked($red));
    $blue.off('click', clicked($blue));
    $yellow.off('click', clicked($yellow));
    $green.off('click', clicked($green));
    alert('you lost!');
  }

  // //need func that reads user clicks (out of generated array) and compares with orderedClicks to make sure is same
  // var generateUserSequence = function($element) {
  //   userClicks.push($element);
  // }

  //need some kind of timeOut (after last item in userClicks is confirmed) that runs the func that calls clicked on every item in orderedClicks[]
  var compareClicks = function() {
    // if(userClicks.length < orderedClicks.length){
    //   console.log('keep going');
    // }else{
      var moveOn = true;
      for (var i = 0; i < orderedClicks.length; i++) {
        if(orderedClicks[i] !== userClicks[i]){
          moveOn = false;
        }
      }
      if(moveOn) {
        //clears user clicks
        $highScore.text(userClicks.length);
        console.log($highScore.val());
        alert('you get to move on!');
        userClicks=[];
        computer=true;
        addToSequence();
        setTimeout(runOrderedClicks, 1000);
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
  $highScore = $('actual-score'); 
 
  //Beginning game with item in array
  addToSequence();

  //gets game started when start button pressed
  $start.on('click', function(){
    //warn user
    alert('GET READY');
    //start displaying the button's glow after 1 second
    setTimeout(runOrderedClicks,1000);
  }); 

  //ready for user clicks!
  $red.on('click', clicked($red));
  $blue.on('click', clicked($blue));
  $yellow.on('click', clicked($yellow));
  $green.on('click', clicked($green));
});





