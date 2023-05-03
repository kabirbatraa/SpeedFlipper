

class Rain {

  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(random(width),random(-1000,0));
    this.vel = createVector(random(-1,1),random(20,30));
    this.length = random(20,40);
    this.thick = random(1,2);
    this.opacity = random(20,200);

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