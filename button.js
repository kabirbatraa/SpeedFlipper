

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

function buttonWithImage(x, y, w, h, newState, words, buttonImage) {
  fill(0,0);
  if(mouseIsIn(x, y, w, h)) {
    fill(0,80);
    if(mouseDown) {
      windowState = newState;
      mouseDown = false;
      if(newState == "menu") initialize();
      return true;
    }
    
  }
  push();
  rectMode(CENTER);
  
  imageMode(CENTER);
  image(buttonImage, x, y, w, h);
  rect(x, y, w, h, 20);


  pop();

  // fill(0);
  // textSize(25);
  // text(words,x, y);
  return false;
}