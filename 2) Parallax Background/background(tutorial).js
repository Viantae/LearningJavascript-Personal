// TileSet Map
// 1 - Ground, 0 - Air
const tileSize = 64
map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]
const backgroundCanvas = document.getElementById("backgroundCanvas");
const background_ctx = backgroundCanvas.getContext("2d");
const CANVA_WIDTH = (backgroundCanvas.width = 800);
const CANVA_HEIGHT = (backgroundCanvas.height = 700);
const SKY_HEIGHT = 130;

// Set Fixed Speed
let gamespeed = 2;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "Sprites/Background/pine1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "Sprites/Background/sky.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "Sprites/Background/sky_cloud.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "Sprites/Background/cloud.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "Sprites/Tile/Ground/ground_2.png";

//Class for storing background layer parameters
class Layer {
  constructor(image, speedModifier, height, y = 0, x = 0, width = CANVA_WIDTH) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = this.width;
    this.image = image;
    
    // Used to change speed of backgrounds dynamically achieving parallax effect
    this.speedModifier = speedModifier;
    this.speed = gamespeed * this.speedModifier;
  }

  // Moving background layers and resetting them once off screen
  update() {
    this.speed = gamespeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.x2 + this.width - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.x + this.width - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  // Take layer object and draw it on canvas
  draw() {
    background_ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    background_ctx.drawImage(
      this.image,
      this.x2,
      this.y,
      this.width,
      this.height
    );
  }
}

groundTile = () =>{
  for (let row = 0; row < this.map.length; row++) {
    for (let column = 0; column < this.map[row].length; column++) {
      const tile = this.map[row][column];
      let image = null;
      switch (tile) {
        case 1:
          image = backgroundLayer5;
          break;
      }
      if (image != null){
        background_ctx.drawImage(
          image,
          column * tileSize,
          650,
          tileSize,
          tileSize
        );
      }
    }
  }
}

// Background layer definitions
const treeLayer = new Layer(backgroundLayer1, gamespeed / 1.2, 400, 300);
const skyLayer = new Layer(backgroundLayer2, gamespeed / 2, CANVA_HEIGHT);
const cloudLayer = new Layer(backgroundLayer4, gamespeed / 4, SKY_HEIGHT);
const groundLayer = new Layer(backgroundLayer5, gamespeed / 1.2, tileSize, 650, 0, tileSize);

const backgroundObjects = [skyLayer, treeLayer, cloudLayer, groundLayer];

animate = () => {
  background_ctx.clearRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
  backgroundObjects.forEach(object => {
    if (object.image == backgroundLayer5){
      groundTile()
    }
    else{
      object.update();
      object.draw();
    }
  });
  requestAnimationFrame(animate);
};


// Slider
const slider = document.getElementById("slider");
slider.value = gamespeed;
const showGameSpeed = document.getElementById("showGameSpeed");

// First page load value of game speed
showGameSpeed.innerHTML = gamespeed;

// Speed multiplier
slider.addEventListener("change", function (evt) {
  gamespeed = evt.target.value;
  showGameSpeed.innerHTML = evt.target.value;
});

animate();

/* Simplified way of infinite scroll
  background_ctx.drawImage(backgroundLayer2, x, 0, CANVA_WIDTH, CANVA_HEIGHT);
  background_ctx.drawImage(backgroundLayer2, x2, 0, CANVA_WIDTH, CANVA_HEIGHT);
  if (x < -CANVA_WIDTH) x = CANVA_WIDTH + x2 - gamespeed;
  else x -= gamespeed;
  if (x2 < -CANVA_WIDTH) x2 = CANVA_WIDTH + x - gamespeed;
  else x2 -= gamespeed;
  requestAnimationFrame(animate);
  console.log(`x = ${x} : x2 = ${x2}`);
  */

  /*
// TileSet Map
// 1 - Ground, 0 - Air
const tileSize = 16;
map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const backgroundCanvas = document.getElementById("backgroundCanvas");
const background_ctx = backgroundCanvas.getContext("2d");
const CANVA_WIDTH = (backgroundCanvas.width = map.length * tileSize); // (backgroundCanvas.width = 800);
const CANVA_HEIGHT = (backgroundCanvas.height = map[0].length * tileSize); // //(backgroundCanvas.height = 700);
console.log(CANVA_HEIGHT);
console.log(CANVA_WIDTH);
const SKY_HEIGHT = 211;
let gamespeed = 1;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "Sprites/Background/pine1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "Sprites/Background/sky.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "Sprites/Background/sky_cloud.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "Sprites/Background/cloud.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "Sprites/Tile/Ground/ground_2.png";

//Class for storing background layers
class Layer {
  constructor(image, speedModifier, height, y = 0, x = 0, width = CANVA_WIDTH) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = this.width;
    this.image = image;

    // Used to change speed of backgrounds dynamically achieving parallax effect
    this.speedModifier = speedModifier;
    this.speed = gamespeed * this.speedModifier;
  }

  // Moving background layers and resetting them once off screen
  update() {
    this.speed = gamespeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.x2 + this.width - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.x + this.width - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  // Take layer object and draw it on canvas
  draw() {
    background_ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    background_ctx.drawImage(
      this.image,
      this.x2,
      this.y,
      this.width,
      this.height
    );
  }
}

// Background layer definitions
const treeLayer = new Layer(backgroundLayer1, gamespeed / 1.2, 250, 150);
const skyLayer = new Layer(backgroundLayer2, gamespeed / 2, CANVA_HEIGHT);
const cloudLayer = new Layer(backgroundLayer4, gamespeed / 4, 70);
const groundLayer = new Layer(
  backgroundLayer5,
  gamespeed / 1.2,
  16,
  440,
  0,
  16
);

const backgroundObjects = [skyLayer, treeLayer, cloudLayer, groundLayer];

animate = () => {
  background_ctx.clearRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
  backgroundObjects.forEach((object) => {
    object.update();
    object.draw();
  });
  for (let row = 0; row < this.map.length; row++) {
    for (let column = 0; column < this.map[row].length; column++) {
      const tile = this.map[row][column];
      let image = null;
      switch (tile) {
        case 1:
          image = backgroundLayer5;
          break;
      }
      console.log(column * tileSize)
      console.log(row * tileSize)
      if (image != null){
        background_ctx.drawImage(
          image,
          column * tileSize,
          row * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  }
  requestAnimationFrame(animate);
};

// Slider
const slider = document.getElementById("slider");
slider.value = gamespeed;
const showGameSpeed = document.getElementById("showGameSpeed");

// First page load value of game speed
showGameSpeed.innerHTML = gamespeed;

slider.addEventListener("change", function (evt) {
  gamespeed = evt.target.value;
  showGameSpeed.innerHTML = evt.target.value;
});

animate();

/* 
Simplified way of infinite scroll
  background_ctx.drawImage(backgroundLayer2, x, 0, CANVA_WIDTH, CANVA_HEIGHT);
  background_ctx.drawImage(backgroundLayer2, x2, 0, CANVA_WIDTH, CANVA_HEIGHT);
  if (x < -CANVA_WIDTH) x = CANVA_WIDTH + x2 - gamespeed;
  else x -= gamespeed;
  if (x2 < -CANVA_WIDTH) x2 = CANVA_WIDTH + x - gamespeed;
  else x2 -= gamespeed;
  requestAnimationFrame(animate);
  console.log(`x = ${x} : x2 = ${x2}`);
*/
