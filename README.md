# simon

My goal is make a playable game of simon says where the four different buttons light up in a randomly constructed order. The user will then be expected to input this same order. If they do this successfully, they will advance to a longer string of commands. 

# User Story:
-User should be able to click start button
-user shold be able to see buttons light up and hear accompanying sound
-user should be notified when it is their turn
-user should be able to click each button 
  -should be notified if they get the order wrong
  -notified if they get to progress
-see high score
-notified when they beat their own high score

# Wire frame:
image in main folder

# Bare Bones Coding strategy:

  *CSS-*
    four clickable buttons
  *HTML-*
    div containing whole board
    div for score 
    div for all four buttons
      -button/a for color1
      -button/a for color2  
      -button/a for color3
      -button/a for color4
      -button/a for starting
  *JS/jquery-*
    array for order of buttons
    randomization for choosing next color to psuh onto this array
    method that runs through this array, showing each button pressed (adding light up classes and sounds)
    event listeners for each button clicked
      add classes to show lit up
      make sounds 
    method to check these clicks against the appropriate order
    counter to keep track of my clicks in order to check against order array
    method to erase array and start over

  
