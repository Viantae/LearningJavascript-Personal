// Note: Multiplication is better for performance

/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 800;

// Stores where canvas is located
let canvasposition = canvas.getBoundingClientRect();
// console.log(canvasposition)

// Holds effects
const explosions = [];

// Effect at x and y coordinates
class Explosions {
  constructor(x, y) {
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;

    this.x = x;
    this.y = y; 

    this.image = new Image();
    this.image.src = "Effects/Free Smoke Fx  Pixel 06 copy.png";
    this.frame = 0;
    this.timer = 0;

    // Value in radians (360 degrees roughly 6.2 radians)
    this.angle = Math.random() * 6.2;

    // this.sound = new Audio();
    // this.sound.src = "Effects/mixkit-arcade-game-explosion-2759.wav"
  }

  update() {
    // if(this.frame === 0) this.sound.play()
    this.timer++
    if(this.timer % 10 === 0){
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    // Rotate around center
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,                              //this.spriteHeight * this.frame,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width/2,  // x
      0 - this.height/2, // y
      this.width,
      this.height
    );
    ctx.restore();
  }
}

animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for(let i = 0; i < explosions.length; i++){
    explosions[i].update();
    explosions[i].draw();

    // Remove from array once done animating
    // Improvement: Object pooling
    if(explosions[i].frame > 12){
      explosions.splice(i, 1);
      i--
    }
  }
  requestAnimationFrame(animate);
}

animate();

createAnimation = (e) => {
  let positionX = e.x - canvasposition.left;
  let positionY = e.y - canvasposition.top;
  explosions.push(new Explosions(positionX, positionY));
  // console.log(e)
  // console.log(explosions)
}

window.addEventListener('click', function(e){
    createAnimation(e);
});

window.addEventListener('resize', function(e){
  canvasposition = canvas.getBoundingClientRect();
});

window.addEventListener('mousemove', function(e){
  createAnimation(e);
});
