$(document).ready(function() {
  var $red = $('#red');
  var $blue = $('#blue');
  var $yellow = $('#yellow');
  var $green = $('#green');

  var clicked = function($element) {
    //closure
    console.log('got clicked');
    console.log('tried noFlash');
    var noFlash = function() {
      $element.removeClass('flash');
    }
    //making invisable for 150 mili-seconds
    var flash = function() {
      console.log('tried flash');
      $element.addClass('flash');
      setTimeout(noFlash, 150);     
    }
    return flash;
  }

  $red.on('click', clicked($red));
  $blue.on('click', clicked($blue));
  $yellow.on('click', clicked($yellow));
  $green.on('click', clicked($green));
});