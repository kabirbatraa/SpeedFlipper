

class Rain {

  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(random(width),random(-1000,0));
    this.vel = createVector(random(-2,2),random(40,100));
    this.length = random(20,100);
    this.thick = random(1,5);
    this.opacity = random(80,150);

  }

  draw() {
    stroke(0,0,255, this.opacity);
    strokeWeight(this.thick);
    line(this.pos.x,this.pos.y-this.length,this.pos.x,this.pos.y)
  }

  update() {
    this.pos.y += this.vel.y;
    this.pos.x += this.vel.x;

    // this.pos.x = width/2;
    // this.pos.y = height/2 + 100;
    if(this.pos.y > height+100) {
      // this.pos.y = 0-this.length;
      this.reset();
    }
    // console.log(this.pos);
    // console.log(this.thick);
  }

  // applyForce() {

  // }

}