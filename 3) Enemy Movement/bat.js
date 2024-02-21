
// Canvas definition
const canvas2 = document.getElementById("enemyCanvas");
const canvas_ctx2 = canvas2.getContext("2d");
CANVAS_WIDTH = canvas2.width = 500;
CANVAS_HEIGHT = canvas2.height = 1000;
CANVAS_y = 470;

// Enemy definition
maxEnemies = 50;
enemiesArray = [];


// Frame speed 
gameFrame = 0;


// Class to generate multiple enemy objects
class Enemy2 {
  constructor() {
    this.image = new Image();
    this.image.src = 'Bat/Bat_Full.png';
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = Math.floor(Math.random() * (canvas2.width - this.width));
    this.y = Math.floor(Math.random() * (canvas2.height - this.height));
    this.frame = 1;                                                      
    this.speed = Math.random() * 1.5 + 0.5;
    this.animationSpeed = Math.floor(Math.random() * 6 + 4)
    
    // angle - wave movement
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 2;
  }

  // Method for enemy movement
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed

    // If move off screen come back on opposite side
    if (this.x + this.width < 0) {this.x = canvas.width}
    //if (this.x  > this.width*10) {this.x = -canvas.width}

    if(gameFrame % this.animationSpeed=== 0){
      this.frame > 3 ? this.frame = 1 : this.frame++;
    }
  }

  // Method for drawing onto the canvas2
  draw() {

    // Reverse to go right to left
    canvas_ctx2.translate(this.x + this.width, this.y);

    // canvas_ctx2.strokeRect(this.x -this.width, this.y, this.width, this.height)

    // Flip the image/sprite 180
    canvas_ctx2.scale(-1, 1);

    canvas_ctx2.drawImage(
      this.image,
      this.frame * this.spriteWidth, 
      0,
      this.spriteWidth, 
      this.spriteHeight,

      // Reverse the movement
      -this.x,  

      this.y, 
      this.width, 
      this.height  
    );
    canvas_ctx2.setTransform(1, 0, 0, 1, 0, 0);
  }
}


// For multiple enemies
for (let i = 0; i < maxEnemies; i++) {
  enemiesArray.push(new Enemy2());
}

animate = () => {
  canvas_ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
  requestAnimationFrame(animate);
  gameFrame++
};

animate();
