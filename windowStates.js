

function drawMenu() {
  background(0);
  fill(255);
  textSize(50);
  text("SpeedFlipper", width/2, height/3);
  textSize(20);
  text("by Kabir Batra", width/2, height/3 +50);

  button(width/2, 2*height/3, 120, 50, "game", "Start");
  
  button(width/2, 2*height/3+60, 120, 50, "tutorial", "Tutorial");
  button(width/2, 2*height/3+60+60, 120, 50, "hexTable", "Hex Table");

}



function drawTutorial() {
  background(0);
  button(width/2, height/5, 250, 50, "menu", "back to menu");
  fill(255);
  var tutorialText = "1. Read the hexadecimal number (in blue)\n\n"
    + "2. Convert the number into binary\n\n"
    + "3. Flip the bits at the bottom \n"
    + "to match the binary number\n\n"
    + "4. Get past as many rounds as possible!\n";
  text(tutorialText, width/2, height/2+50);


}



function drawHexTable() {
  background(0);
  button(width/2, height/6, 250, 50, "menu", "back to menu");
  fill(255);

  push();
  textAlign(LEFT,CENTER);
  rectMode(CENTER);
  // rect(width/2, height/2, 3, 300);
  // rect(width/2, height/2, 400, 3);
  textSize(15);
  text('hex', width/2 - 2*spacing, height/4+10);
  text('binary', width/2 + spacing, height/4+10);

  for(var i = 0; i < 16; i++) {
    text(i.toString(16).toUpperCase(), width/2 - 2*spacing, height/4+10+(i+1)*20);
    text(i.toString(2), width/2 + spacing, height/4+10+(i+1)*20);
  }

  // image(table, width/2, height/2);
  pop();
}



function gameOver() {
  if(!dimmed) {
    background(0, 150);
  dimmed = true;
  }
  
  fill("red");
  textSize(60);
  text("YOU LOSE", width/2, 4*height/9-10);
  text("Your score is " + score, width/2, 5*height/9-10);

  fill(255);
  button(width/2, 2*height/3, 100, 50, "reset", "restart");
  fill(255);
  button(width/2, 2*height/3+60, 200, 50, "menu", "back to menu");

}