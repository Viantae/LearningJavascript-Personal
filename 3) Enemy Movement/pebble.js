
/*
// Canvas definition
const canvas = document.getElementById("enemyCanvas");
const canvas_ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

// Enemy definition
const maxEnemies = 50;
const enemiesArray = [];
*/

// Frame speed 
// let gameFrame = 0;


// Class to generate multiple enemy objects
class Enemy3 {
  constructor() {
    this.image = new Image();
    this.image.src = 'Pebble/Pebble_Run.png';
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth / 0.7;
    this.height = this.spriteHeight / 0.7;
    this.x = Math.floor(Math.random() * (canvas.width - this.width));
    this.y = Math.floor(Math.random() *(canvas.height - this.height));
    this.frame = 1;
    this.speed = Math.random() * 1.5 + 0.5;
    this.animationSpeed = Math.floor(Math.random() * 6 + 4)
    
    // angle - wave movement
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.5 + 1.5; // Rotation speed
    this.curve = Math.random() * 200 + 50; 
    
  }

  // Method for enemy movement
  update() {
    // Movement based on wavelengths 
    this.x = this.curve * Math.sin(this.angle * Math.PI/90) + (canvas.width/2 - this.width/2);
    this.y = this.curve * Math.cos(this.angle * Math.PI/500) + (canvas.height/2 - this.height/2);

    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {this.x = canvas.width}
    //if (this.x  > this.width*10) {this.x = -canvas.width}
    if(gameFrame % this.animationSpeed === 0){
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }

  // Method for drawing onto the canvas
  draw() {
    // canvas_ctx.strokeRect(this.x, this.y, this.width, this.height)
    canvas_ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth, 
      0,
      this.spriteWidth, 
      this.spriteHeight,
      this.x,  
      this.y, 
      this.width, 
      this.height  
    );
  }
}


// For multiple enemies
for (let i = 0; i < maxEnemies; i++) {
  enemiesArray.push(new Enemy());
}

animate = () => {
  canvas_ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
  requestAnimationFrame(animate);
  gameFrame++
};

animate();
