
var eightBits;
var keys;
var currentHex;
var spacing;

var score;
var health;

var lossHealthRate;

var state;

var scoreColor;

var mouseDown;

var dimmed;

// let paper;
// let zcool;
// function preload() {
  // myFont = loadFont('assets/PAPYRUS.TTF');
  // myFont = loadFont('assets/ZCOOLKuaiLe-Regular.ttf');
// }

function setup() {
  createCanvas(500,500);
  noStroke();
  fill(0);
  textAlign(CENTER,CENTER);
  
  keys = "asdfjkl;";
  spacing = (width / 8);
  state = "menu"; // menu, game, gameOver, reset, tutorial
  initialize();
  // textFont(paper);
  // textFont(zcool);
  textFont('Trebuchet MS');

}

function initialize() {
  eightBits = [false,false,false,false,false,false,false,false];
  currentHex = randomHexGenerator();
  score = 0;
  health = 100;
  lossHealthRate = 0;
  scoreColor = "white";
  mouseDown = false;
  dimmed = false;
}



function draw() {
  if (state == "menu") {
    displayMenu();
  }
  else if(state == "game") {
    runGame();
  }

  else if(state == "gameOver") {
    gameOver();
  }

  else if(state == "reset") {
    initialize();
    state = "game";
  }

  else if (state == "tutorial") {
    drawTutorial();
  }

}

function displayMenu() {
  background(0);
  fill(255);
  textSize(50);
  text("SpeedFlipper", width/2, height/3);
  textSize(20);
  text("by Kabir Batra", width/2, height/3 +50);

  button(width/2, 2*height/3, 100, 50, "game", "start");
  
  button(width/2, 2*height/3+60, 100, 50, "tutorial", "tutorial");

}

function button(x, y, w, h, newState, words) {
  fill(255);
  if(mouseIsIn(x, y, w, h)) {
    fill(150);
    if(mouseDown) {
      state = newState;
      mouseDown = false;
      if(newState == "menu") initialize();
    }
    
  }
  push();
  rectMode(CENTER);
  rect(x, y, w, h, 20);
  pop();

  fill(0);
  textSize(25);
  text(words,x, y);
}

function drawTutorial() {
  background(0);
  button(width/2, height/5, 250, 50, "menu", "back to menu");
  fill(255);
  var tutorialText = "1. Read the hexadecimal number (in blue)\n\n"
    + "2. Flip the binary bits to match them\n"
    + "up with the hexadecimal number\n\n"
    + "3. Repeat\n\n"
    + "4. Your score is the number of rounds\n"
    + "you can pass without running out of health";
  text(tutorialText, width/2, height/2+50);


}

function runGame() {
  background(0);
  
  checkForClick();

  drawBits();
  
  // draw the hex
  fill("blue");
  textSize(100);
  textFont('Georgia');
  text(currentHex, width/2, height/2);
  textFont('Trebuchet MS');

  textSize(50);
  fill(scoreColor);
  push();
  text(score, spacing/2, spacing/2);
  pop();

  
  if(health > 0) health -= lossHealthRate;
  if(health <= 0) {
    health = 0;
    state = "gameOver";
  }
  drawHealth();

  textSize(20);
  fill(255);
  text("Highscore: 20", width - 75, spacing/3);
}

function drawBits() {
  rectMode(CORNER);
  for(var i = 0; i < 8; i++) {
    push()
    stroke("white");

    if(eightBits[i]) {
      fill(255);
      rect(i * spacing, height - spacing, spacing, spacing, 20);
      fill(0);
      text(keys[i], i * spacing+spacing/2, height - spacing+spacing/2);
    } 
    else {
      fill(0);
      rect(i * spacing, height - spacing, spacing, spacing, 20);
      fill(255);
      text(keys[i], i * spacing+spacing/2, height - spacing+spacing/2);
    }
    pop();
  }
  var bits = readBits();
  fill(255);
  textSize(50);
  text(bits, width - spacing, height - 2*spacing);
}

function drawHealth() {

  let len = 300;

  fill("red");
  rect((width - len)/2, spacing*2, len, 15, 4)
  fill("green");
  rect((width - len)/2, spacing*2, len*health/100, 15, 4)
}

function randomHexGenerator() {
  var num = floor(random() * 255)+1;
  // console.log(num);
  // console.log(floor(num/16).toString(16).toUpperCase());
  // console.log((num % 16).toString(16).toUpperCase());
  var hex = floor(num/16).toString(16).toUpperCase() + (num % 16).toString(16).toUpperCase()
  console.log(num);
  return hex;
  
}

function readBits() {
  var total = 0;
  for(var i = 0; i < 8; i++) {
    if(eightBits[i]) total += 1 << (7 - i);
  }
  total = total.toString(16).toUpperCase();
  if(total.length == 1) total = "0" + total;
  return total;
}

function check() {
  if(readBits() == currentHex) {
    nextThing();
    
  }
}

function nextThing() {
  currentHex = randomHexGenerator();
  eightBits = [false,false,false,false,false,false,false,false];
  score += 1;
  health = 100;
  if(lossHealthRate < 1) lossHealthRate += 0.05;
  if(lossHealthRate >= 1) {
    console.log("you are at max speed!")
    scoreColor = "lightgreen";
  }

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
  

// assuming centered
function mouseIsIn(x,y,w,h) {
  return (x - w/2) <= mouseX && mouseX <= (x + w/2) && y - h/2 <= mouseY && mouseY <= y + h/2;
}


function keyPressed() {
  if(state == "game") {

    for(var i = 0; i < keys.length; i++) {
      if(key == keys[i]) {
        eightBits[i] = !eightBits[i];
      }
    }

  }
  else if(state == "gameOver") {
    if(key == 'r') {
      state = "reset";
    }
  }

  if(keyCode == BACKSPACE) {
    eightBits = [false,false,false,false,false,false,false,false];
  }

  // if(key == '6') {
  //   nextThing();
  // }
  // if(key == '9') {
  //   state = "gameOver";
  // }
  

  // if(keyCode == ENTER) {
    check(); 
  // }
}

function checkForClick() {
  if(!mouseDown) return;
  if(mouseY > height-spacing) {
    let pos = floor(map(mouseX, 0,width,0,8));
    eightBits[pos] = !eightBits[pos];
    mouseDown = false;
    check();
  }
}

function mousePressed() {
  mouseDown = true;
}

function mouseReleased() {
  mouseDown = false;
}