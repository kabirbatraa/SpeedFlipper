

// state variables
var windowState;
var funMode;
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
var keys;
var labels;

function setup() {
  createCanvas(500,500);
  noStroke();
  fill(0);
  textAlign(CENTER,CENTER);
  
  keys = "asdfjkl;";
  labels = ["80","40","20","10","08","04","02","01"];
  spacing = (width / 8);
  windowState = "menu"; // menu, game, gameOver, reset, tutorial, hexTable
  initialize();
  // textFont(paper);
  // textFont(zcool);
  textFont('Trebuchet MS');

}

function initialize() {
  currentBits = [false,false,false,false,false,false,false,false];
  numBits = 2;
  currentHex = generateHexBit(numBits);
  score = 0;
  health = 100;
  lossHealthRate = 0;
  scoreColor = "white";
  mouseDown = false;
  dimmed = false;
  funMode = false;
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

}



function button(x, y, w, h, newState, words) {
  fill(255);
  if(mouseIsIn(x, y, w, h)) {
    fill(150);
    if(mouseDown) {
      windowState = newState;
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

function runGame() {
  background(0);
  
  checkForClick();

  drawBits();
  
  if(funMode)
    if(!(currentHex.includes("B") || currentHex.includes("D"))) nextRound();

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
  text("Highscore: 24", width - 75, spacing/3);
}

function drawBits() {
  rectMode(CORNER);
  for(var i = 0; i < 8; i++) {
    push()
    stroke("white");

    fill(255);
    text(labels[i], i * spacing+spacing/2, height - spacing+spacing/2 - 50);
    // rect(i * spacing+spacing/2,height - spacing+spacing/2-100,5,5);

    if(currentBits[i]) {
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

function readBits() {
  var total = 0;
  for(var i = 0; i < 8; i++) {
    if(currentBits[i]) total += 1 << (7 - i);
  }
  total = total.toString(16).toUpperCase();
  if(total.length == 1) total = "0" + total;
  return total;
}

function check() {
  if(readBits() == currentHex) {
    nextRound();
    
  }
}

function nextRound() {
  currentHex = generateHexBit(numBits);
  currentBits = [false,false,false,false,false,false,false,false];
  score += 1;
  health = 100;
  if(lossHealthRate < 1) lossHealthRate += 0.05;
  if(lossHealthRate >= 1) {
    console.log("you are at max speed!")
    scoreColor = "lightgreen";
  }

}

// assuming centered
function mouseIsIn(x,y,w,h) {
  return (x - w/2) <= mouseX && mouseX <= (x + w/2) && y - h/2 <= mouseY && mouseY <= y + h/2;
}


function keyPressed() {
  if(windowState == "game") {

    for(var i = 0; i < keys.length; i++) {
      if(key.toLowerCase() == keys[i]) {
        currentBits[i] = !currentBits[i];
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