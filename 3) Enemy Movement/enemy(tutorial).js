// After-Thoughts (After Finished Coding)
// Notes :- The bat enemy type code causes some sprites to spawn outside of bounds due to negative values used
//          therefore, losing some values/entities on screen

//Improvements :- Usage of inheritence is more efficient and clean (Ex: Enemy class, Bat class inherit default values from enemy class)
//              - Organise Codes better and neatly
//              - Use less hard coded values
//              - Create object definition for different enemy types (so no need to set a control statement in the constructor)

// Get definitions/code suggestions for HTMLCanvasElement
/**@type {HTMLCanvasElement} */

window.alert("click button to view")

// Canvas definition
const canvas = document.getElementById("enemyCanvas");
const canvas_ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

// Enemy types
const enemytypeArray = ["skull", "bat", "pebble", "golem"];
const numOfenemyTypes = enemytypeArray.length;

// Number of Enemies
let maxEnemies = 10;
let enemiesArray = [];

// Frame speed
let gameFrame = 0;

// For switching between enemies (website page interaction)
let buttonPress = 0;
let nav = -1;

// Class to generate multiple enemy objects
class Enemy {
  constructor(enemy) {
    // Original sprite size
    this.spriteWidth = 64;
    this.spriteHeight = 64;

    // Sprite size on canvas
    this.width = this.spriteWidth / 0.5;
    this.height = this.spriteHeight / 0.5;

    // Random location and speed on Canvas
    this.x = Math.floor(Math.random() * (canvas.width - this.width));
    this.y = Math.floor(Math.random() * (canvas.height - this.height));

    // Sprite frame animation
    this.frame = 1;

    this.startFrame = 0;
    this.endFrame = 4;

    // Sprite speed
    //this.speed = Math.random() * 4 - 2;
    this.animationSpeed = Math.floor(Math.random() * 6 + 4);

    this.image = new Image();
    switch (enemy) {
      case "skull":
        this.name = "skull";
        this.image.src = "Skull/Bones_SingleSkull_Full_FX.png";
        break;
      case "bat":
        this.name = "bat";
        this.image.src = "Bat/Bat_Full.png";
        this.startFrame = 1;
        this.endFrame = 3;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 2;
        this.speed = Math.random() * 1.5 + 0.5;
        break;
      case "pebble":
        this.name = "pebble";
        this.image.src = "Pebble/Pebble_Run.png";
        this.endFrame = 2;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.5 + 1.5;
        this.curve = Math.random() * 200 + 50;
        break;
      case "golem":
        this.name = "golem";
        this.image.src = "Golem/Armored/Golem_Armor_Full.png";
        this.newX = Math.floor(Math.random() * (canvas.width - this.width));
        this.newY = Math.floor(Math.random() * (canvas.height - this.height));
        this.animationSpeed = Math.floor(Math.random() * 10 + 20);
        this.interval = Math.floor(Math.random() * 200 + 100);
        break;
    }
  }
  //Movement types
  stutter_movement() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
  }

  flying_movement() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    // If move off screen come back on opposite side
    if (this.x + this.width < 0) {
      this.x = canvas.width;
    }

    //if (this.x  > this.width*10) {this.x = -canvas.width}
  }

  tornado_movement() {
    this.x =
      this.curve * Math.sin((this.angle * Math.PI) / 90) +
      (canvas.width / 2 - this.width / 2);
    this.y =
      this.curve * Math.cos((this.angle * Math.PI) / 500) +
      (canvas.height / 2 - this.height / 2);

    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = canvas.width;
    }
  }

  zip_movement() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.floor(Math.random() * (canvas.width - this.width));
      this.newY = Math.floor(Math.random() * (canvas.height - this.height));
    }

    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 180;
    this.y -= dy / 180;

    if (this.x + this.width < 0) {
      this.x = canvas.width;
    }
  }

  switch_spriteFrames(startFrame, endFrame) {
    // animate sprites
    if (gameFrame % this.animationSpeed === 0) {
      this.frame > endFrame ? (this.frame = startFrame) : this.frame++;
    }
  }

  // Method for enemy movement
  update(enemy) {
    if (enemy == "skull") {
      this.stutter_movement();
    } else if (enemy == "bat") {
      this.flying_movement();
    } else if (enemy == "pebble") {
      this.tornado_movement();
    } else if (enemy == "golem") {
      this.zip_movement();
    }
    this.switch_spriteFrames(this.startFrame, this.endFrame);
  }
  // Method for drawing onto the canvas
  draw() {
    // canvas_ctx.strokeRect(this.x, this.y, this.width, this.height);
    canvas_ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth, // Animation frame position x
      0, // Animation frame position y
      this.spriteWidth,
      this.spriteHeight,

      this.x, // position on canvas
      this.y, //         ^
      this.width, // size on canvas
      this.height //      ^
    );
  }
  reversedraw() {
    // Reverse to go right to left
    canvas_ctx.translate(this.x + this.width, this.y);

    // canvas_ctx2.strokeRect(this.x -this.width, this.y, this.width, this.height)

    // Flip the image/sprite 180
    canvas_ctx.scale(-1, 1);

    canvas_ctx.drawImage(
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
    canvas_ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

// Function that animates the sprites
animate = () => {
  canvas_ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    if (enemy.name == "bat") {
      enemy.reversedraw();
    } else {
      enemy.draw();
    }
    enemy.update(enemytypeArray[nav]);
  });

  // Break recursion function
  // Reason: If user presses the button more than once,
  // recursion will be called multiple times resulting in
  // undesireable output
  if (buttonPress > 1) {
    buttonPress = 1;
    return;
  }
  requestAnimationFrame(animate);
  gameFrame++;
};



// Button to switch enemies
const nextbtn = document.querySelector(".nextButton");
const prevbtn = document.querySelector(".prevButton");

// Cycle to next enemy in enemyType list
nextbtn.addEventListener("click", function () {
  buttonPress++;

  // Keep track of position in list
  nav++;

  // Reset enemyArray to prevent more entities spawning
  enemiesArray.length = 0;

  gameFrame = 0;
  if (nav > numOfenemyTypes - 1) {
    nav = -1;
  }

  // For multiple enemies
  for (let i = 0; i < maxEnemies; i++) {
    enemiesArray.push(new Enemy(enemytypeArray[nav]));
  }
  animate();
});
// Cycle to prev enemy in enemyType list
prevbtn.addEventListener("click", function () {
  buttonPress++;

  nav--;
  enemiesArray.length = 0;
  gameFrame = 0;
  if (nav <= (-numOfenemyTypes+2)) {
    nav = numOfenemyTypes-1;
  }

  // For multiple enemies
  for (let i = 0; i < maxEnemies; i++) {
    enemiesArray.push(new Enemy(enemytypeArray[nav]));
  }
  animate();
});

/*
// cOuld be a website animation 

// Get definitions/code suggestions for HTMLCanvasElement
/**@type {HTMLCanvasElement} * <-- put '/' 

// Canvas definition
const canvas = document.getElementById('canvas');
const canvas_ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

// Object definition  
const maxObjects = 50;
const objectArray = [];


// Class to generate multiple objects
class Object{
  constructor(){
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);;
    this.width = 100;
    this.height = 100;
    this.speed = Math.random() * 4 - 2;
  }
  // Method for object movement
  update(){
    this.x += this.speed;
    this.y += this.speed;
  }
  // Method for drawing onto the canvas
  draw(){
    canvas_ctx.strokeRect(this.x, this.y, this.width, this.height)
  
  }
}

// For multiple objects
for(let i = 0; i < maxEnemies; i++){
  objectArray.push(new Object());
}
 
animate = () =>{
  canvas_ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  objectArray.forEach(object => {
    object.draw();
    object.update();
  });
  requestAnimationFrame(animate);
}

animate();


*/
