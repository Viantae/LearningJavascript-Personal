
/*
// Canvas definition
const canvas = document.getElementById("enemyCanvas");
const canvas_ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

// Enemy definition
const maxEnemies = 5;
const enemiesArray = [];
*/

// Frame speed 
// let gameFrame = 0;


// Class to generate multiple enemy objects
class Enemy4 {
  constructor() {
    this.image = new Image();
    this.image.src = 'Golem/Armored/Golem_Armor_Full.png';
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth / 0.4;
    this.height = this.spriteHeight / 0.4;
    this.x = Math.floor(Math.random() * (canvas.width - this.width));
    this.y = Math.floor(Math.random() * (canvas.height - this.height));

    // New location
    this.newX = Math.floor(Math.random() * (canvas.width - this.width));
    this.newY = Math.floor(Math.random() * (canvas.height - this.height));

    this.frame = 1;
    this.speed = Math.random() * 1.5 + 0.5;
    this.animationSpeed = Math.floor(Math.random() * 10 + 20);
    this.interval = Math.floor(Math.random() * 350 + 200)

  }

  // Method for enemy movement
  update() {

    // Update every x amount of frames
    if (gameFrame % this.interval === 0){
      this.newX = Math.floor(Math.random() * (canvas.width - this.width));
      this.newY = Math.floor(Math.random() * (canvas.height - this.height));
    }

    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx/180;
    this.y -= dy/180;

    if (this.x + this.width < 0) {this.x = canvas.width;}
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
