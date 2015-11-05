  var $red;
  var $blue;
  var $yellow;
  var $green;
  var computer=true;

  //need an array that holds order
  //will call clicked(on each element)
  var orderedClicks = [];
  var userClicks = [];

  //blinks the button when clicked or called by computer clicks
  var clicked = function($element) {
    if(!computer){
      userClicks.push($element);
    }
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
      compareClicks();  
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

  //need func that reads orderedClicks array and calls clicked() on it
  var runOrderedClicks = function() {
    //how do I space this out in time?
    for (var i = 0; i < orderedClicks.length; i++) {
      setTimeout(clicked(orderedClicks[i]), i*700);
    };
    setTimeout(function(){alert('you\'re turn!');},700*orderedClicks.length);
    computer=false;
  } 

  //need func that cuts out event listeners when player gets order wrong
  var lost = function() {
    alert('you\'re turn!');
  }

  //need func that reads user clicks (out of generated array) and compares with orderedClicks to make sure is same
  var generateUserSequence = function($element) {
    userClicks.push($element);
  }

  //need some kind of timeOut (after last item in userClicks is confirmed) that runs the func that calls clicked on every item in orderedClicks[]
  var compareClicks = function() {
    if(userClicks.length != orderedClicks.length){
      console.log('keep going');
    }else{
      for (var i = 0; i < orderedClicks.length; i++) {
        if(orderedClicks[i] !== userClicks[i]){
          lost();
        }
      }
      //clears user clicks
      userClicks=[];
      computer=true;
      addToSequence();
      runOrderedClicks();
    }
  }

 

$(document).ready(function() {
  $red = $('#red');
  $blue = $('#blue');
  $yellow = $('#yellow');
  $green = $('#green'); 
  $start = $('#start'); 
 
  addToSequence();
  $start.on('click', runOrderedClicks); 
  $red.on('click', clicked($red));
  $blue.on('click', clicked($blue));
  $yellow.on('click', clicked($yellow));
  $green.on('click', clicked($green));
});