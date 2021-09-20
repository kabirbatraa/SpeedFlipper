

// state variables
var windowState;
var gameMode;
var numBits;
var mouseDown;

// in game variables
var currentBits;
var currentHex;
var score;
var health;
var lossHealthRate;

// visuals
var scoreColor;
var spacing;
var dimmed;

// constants
var eightBitHotkeys;
var fourBitHotkeys;
var labels;

function setup() {
  createCanvas(500,500);
  noStroke();
  fill(0);
  textAlign(CENTER,CENTER);
  
  eightBitHotkeys = "asdfjkl;";
  fourBitHotkeys = "  fghj";
  labels = ["80","40","20","10","08","04","02","01"];
  spacing = (width / 8);
  windowState = "menu"; // menu, game, gameOver, reset, tutorial, hexTable, settings
  gameMode = "normal"; // normal, easy
  initialize();

  textFont('Trebuchet MS');

}

function initialize() {
  currentBits = [false,false,false,false,false,false,false,false];
  if(gameMode == "normal") {
    numBits = 2;
  }
  else if (gameMode == "easy") {
    numBits = 1;
  }

  currentHex = generateHexBit(numBits);
  score = 0;
  health = 100;
  lossHealthRate = 0;
  scoreColor = "white";
  mouseDown = false;
  dimmed = false;
}


function draw() {
  if (windowState == "menu") {
    drawMenu();
  }
  else if(windowState == "game") {
    runGame();
  }

  else if(windowState == "gameOver") {
    gameOver();
  }

  else if(windowState == "reset") {
    initialize();
    windowState = "game";
  }

  else if (windowState == "tutorial") {
    drawTutorial();
  }
  
  else if (windowState == "hexTable") {
    drawHexTable();
  }

  else if (windowState == "settings") {
    drawSettings();
  }

}

function button(x, y, w, h, newState, words) {
  fill(255);
  if(mouseIsIn(x, y, w, h)) {
    fill(150);
    if(mouseDown) {
      windowState = newState;
      mouseDown = false;
      if(newState == "menu") initialize();
      return true;
    }
    
  }
  push();
  rectMode(CENTER);
  rect(x, y, w, h, 20);
  pop();

  fill(0);
  textSize(25);
  text(words,x, y);
  return false;
}

function runGame() {
  background(0);
  
  checkForClick();

  if(gameMode == "normal")
    drawEightBits();
  else if(gameMode == "easy")
    drawFourBits();
  
  // if(gameMode == "funMode")
  //   if(!(currentHex.includes("B") || currentHex.includes("D"))) nextRound();

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
    windowState = "gameOver";
  }
  drawHealth();

  textSize(20);
  fill(255);
  if(gameMode == "normal") {
    text("Highscore: 24", width - 75, spacing/3);
  }
  else if(gameMode == "easy") {
    text("Highscore: 71", width - 75, spacing/3);
  }
  
}

function drawEightBits() {
  rectMode(CORNER);
  push()
  for(var i = 0; i < 8; i++) {
    
    stroke("white");

    fill(255);
    text(labels[i], i * spacing+spacing/2, height - spacing+spacing/2 - 50);
    // rect(i * spacing+spacing/2,height - spacing+spacing/2-100,5,5);

    if(currentBits[i]) {
      fill(255);
      rect(i * spacing, height - spacing, spacing, spacing, 20);
      fill(0);
      text(eightBitHotkeys[i], i * spacing+spacing/2, height - spacing+spacing/2);
    } 
    else {
      fill(0);
      rect(i * spacing, height - spacing, spacing, spacing, 20);
      fill(255);
      text(eightBitHotkeys[i], i * spacing+spacing/2, height - spacing+spacing/2);
    }
    
  }
  pop();
  var bits = readEightBits();
  fill(255);
  textSize(50);
  text(bits, width - spacing, height - 2*spacing);
}

function drawFourBits() {
  rectMode(CORNER);
  push()
  for(var i = 2; i < 6; i++) {
    
    stroke("white");

    fill(255);
    text(labels[i+2][1], i * spacing+spacing/2, height - spacing+spacing/2 - 50);
    // rect(i * spacing+spacing/2,height - spacing+spacing/2-100,5,5);

    if(currentBits[i]) {
      fill(255);
      rect(i * spacing, height - spacing, spacing, spacing, 20);
      fill(0);
      text(fourBitHotkeys[i], i * spacing+spacing/2, height - spacing+spacing/2);
    } 
    else {
      fill(0);
      rect(i * spacing, height - spacing, spacing, spacing, 20);
      fill(255);
      text(fourBitHotkeys[i], i * spacing+spacing/2, height - spacing+spacing/2);
    }
    
  }
  pop();
  var bits = readFourBits();
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

function generateHexBit(bits) {
  var hex = "";
  for (var i = 0; i < bits; i++) {
    // var num = floor(random() * 255)+1;
    var num = floor(random() * 15)+1;
    // console.log(num);
    // console.log(floor(num/16).toString(16).toUpperCase());
    // console.log((num % 16).toString(16).toUpperCase());
    // var hex = floor(num/16).toString(16).toUpperCase() + (num % 16).toString(16).toUpperCase()
    hex += num.toString(16).toUpperCase();
  }
  
  // console.log(hex);
  return hex;
  
}

function readEightBits() {
  var total = 0;
  for(var i = 0; i < 8; i++) {
    if(currentBits[i]) total += 1 << (7 - i);
  }
  total = total.toString(16).toUpperCase();
  if(total.length == 1) total = "0" + total;
  return total;
}

function readFourBits() {
  var total = 0;
  for(var i = 2; i < 6; i++) {
    if(currentBits[i]) total += 1 << (3 - (i-2));
  }
  total = total.toString(16).toUpperCase();
  // if(total.length == 1) total = "0" + total;
  return total;
}

function check() {
  
  if((gameMode == "normal" && readEightBits() == currentHex) 
      || (gameMode == "easy" && readFourBits() == currentHex)) {
    nextRound();
  }
}

function nextRound() {
  currentHex = generateHexBit(numBits);
  currentBits = [false,false,false,false,false,false,false,false];
  score += 1;
  health = 100;

  if(lossHealthRate < 1) lossHealthRate += 0.05;
  else if(lossHealthRate >= 1.2) {
    scoreColor = "#5555ff";
    lossHealthRate += 0.001;
    // 100 health / 1.2 health per frame = 83.33 frames
    // 83 frames * 1 second per 60 frames = 1.389 seconds

  }
  else if(lossHealthRate >= 1) { 
    // occurs at a score of 20


    // 60 frames per second
    // -1 health per frame
    // 100 health total
    // 100 frames to die
    // 100 frames * 1 second per 60 frames = 1.66 seconds

    // console.log("you are at max speed!")
    scoreColor = "lightgreen";
    lossHealthRate += 0.01;
  }
  lossHealthRate = Number.parseFloat(lossHealthRate.toPrecision(6));
  console.log(lossHealthRate);


}

// assuming centered
function mouseIsIn(x,y,w,h) {
  return (x - w/2) <= mouseX && mouseX <= (x + w/2) && y - h/2 <= mouseY && mouseY <= y + h/2;
}


function keyPressed() {
  if(windowState == "game") {

    if(gameMode == "normal") {
      for(var i = 0; i < eightBitHotkeys.length; i++) {
        if(key.toLowerCase() == eightBitHotkeys[i]) {
          currentBits[i] = !currentBits[i];
        }
      }
    }
    else if(gameMode == "easy") {
      for(var i = 2; i < fourBitHotkeys.length; i++) {
        if(key.toLowerCase() == fourBitHotkeys[i]) {
          currentBits[i] = !currentBits[i];
        }
      }
    }

    

  }
  else if(windowState == "gameOver") {
    if(key == 'r') {
      windowState = "reset";
    }
  }

  if(keyCode == BACKSPACE) {
    currentBits = [false,false,false,false,false,false,false,false];
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
    currentBits[pos] = !currentBits[pos];
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