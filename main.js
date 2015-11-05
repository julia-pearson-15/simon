$(document).ready(function() {
  var $red = $('#red');
  var $blue = $('#blue');
  var $yellow = $('#yellow');
  var $green = $('#green');

  //need an array that holds order
  //will call clicked(on each element)
  var orderedClicks = [];
  var userClicks = [];

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

  //need func that reads orderedClicks array and calls clicked() on it
  var runOrderedClicks = function() {
    //how do I space this out in time?
    for (var i = 0; i < orderedClicks.length; i++) {
      clicked(orderedClicks[i]);
    };
  }  


  //need func that reads user clicks (out of generated array) and compares with orderedClicks to make sure is same
  var generateUserSequence = function($element) {
    userClicks.push($element);
  }

  //need func that cuts out event listeners when player gets order wrong

  //need some kind of timeOut (after last item in userClicks is confirmed) that runs the func that calls clicked on every item in orderedClicks[]
  var compareClicks = function() {
    if(userClicks.length != orderedClicks.length){
      //lost(); <-make function
    }else{
      for (var i = 0; i < orderedClicks.length; i++) {
        if(orderedClicks[i] !=== userClicks[i]){
          //lost();
        }
      };
      //runOrderedClicks
    }
  }  

  //blinks the button when clicked or called by computer clicks
  var clicked = function($element) {
    // console.log('got clicked');
    // console.log('tried noFlash');
    //closure
    var noFlash = function() {
      $element.removeClass('flash');
    }
    //making invisable for 150 mili-seconds
    var flash = function() {
      //console.log('tried flash');
      $element.addClass('flash');
      setTimeout(noFlash, 150);   
      // ! add sound effect  
    }
    return flash;
  }

  $red.on('click', clicked($red));
  $blue.on('click', clicked($blue));
  $yellow.on('click', clicked($yellow));
  $green.on('click', clicked($green));
});