

function drawMenu() {
  console.log(width)
  background(0);
  fill(255);
  textSize(70);
  if(mobileMode) textSize(width/8);
  text("Speedy Flipper", width/2, height/3);
  textSize(25);
  if(mobileMode) textSize(width/8/2);
  text("by Kabir Batra", width/2, height/3 +50);

  button(width/2, 2*height/3, 120, 50, "game", "Start");
  
  button(width/2, 2*height/3+60, 120, 50, "tutorial", "Tutorial");
  button(width/2, 2*height/3+60+60, 120, 50, "hexTable", "Hex Table");

  // button(width - spacingX, spacingX, 100, 50, "settings","Settings")
  button(width - 50-20, 25+20, 100, 50, "settings","Settings")
}



function drawTutorial() {
  background(0);
  // button(width/2, height/5, 250, 50, "menu", "back to menu");
  button(width/2, 5*height/6, 250, 50, "menu", "back to menu");

  fill(255);
  textSize(50);
  text("Tutorial", width/2, height/6);

  if(mobileMode) textSize(width/24);
  else textSize(25);
  // textSize(20);
  
  push();
  textAlign(CENTER,CENTER);
  var tutorialText = "Read the hexadecimal number (in blue)\n\n"
    + "Convert the number into binary\n\n"
    + "Flip the bits at the bottom \n"
    + "to match the binary number\n\n"
    + "Get past as many rounds as possible!\n";
  // text(tutorialText, spacingX, height/2+50);
  text(tutorialText, width/2, height/2+50);
  pop();

}



function drawHexTable() {
  background(0);
  fill(255);
  textSize(50);
  text("Hex Table", width/2, height/6);

  button(width/2, 5*height/6, 250, 50, "menu", "back to menu");
  fill(255);
  push();
  textAlign(LEFT,CENTER);
  // rectMode(CENTER);
  // rect(width/2, height/2, 3, 300);
  // rect(width/2, height/2, 400, 3);
  textSize(20);
  text('Hex', (width-20)*1/6, height/4);
  text('Hex', (width-20)*4/6, height/4);
  text('Binary', (width-20)*2/6, height/4);
  text('Binary', (width-20)*5/6, height/4);

  let spaceDown = 28;
  
  textSize(15);
  for(var i = 0; i < 8; i++) {
    text(i.toString(16).toUpperCase(), (width-20)*1/6, height/4+10+(i+1)*spaceDown);
    text(("000" + i.toString(2)).slice(-4), (width-20)*2/6, height/4+10+(i+1)*spaceDown);
  }
  for(var i = 8; i < 16; i++) {
    text(i.toString(16).toUpperCase(), (width-20)*4/6, height/4+10+(i+1-8)*spaceDown);
    text(i.toString(2), (width-20)*5/6, height/4+10+(i+1-8)*spaceDown);
  }

  // image(table, width/2, height/2);
  pop();
}


function drawSettings() {
  background(0);
  fill(255);
  textSize(50);
  text("Settings", width/2, height/6);

  button(width/2, 5*height/6, 250, 50, "menu", "back to menu");

  textSize(20);
  if(gameMode == "normal") {
    // if (button(width/2, 2*height/3, 300, 50, "settings", "Switch To Easy Mode")) {
    if (button(width/2, height/2, 300, 50, "settings", "Switch To Easy Mode")) {
      gameMode = "easy";
    }
  }
  else if(gameMode == "easy") {
    if (button(width/2, height/2, 300, 50, "settings", "Switch To Hard Mode")) {
      gameMode = "normal";
    }
  }
  

}


function gameOver() {
  if(!dimmed) {
    push();
    for(var i = 0; i < rain.length; i++) {
      rain[i].draw();
    }
    pop();
    background(0, 150);
  dimmed = true;
  }
  
  fill("red");
  textSize(60);
  if(mobileMode) {
    textSize(spacingX);
    console.log(spacingX);
  }
  text("YOU LOSE", width/2, 4*height/9-10);
  text("Your score is " + score, width/2, 5*height/9-10);

  fill(255);
  button(width/2, 2*height/3, 100, 50, "reset", "restart");
  fill(255);
  button(width/2, 2*height/3+60, 200, 50, "menu", "back to menu");

}
