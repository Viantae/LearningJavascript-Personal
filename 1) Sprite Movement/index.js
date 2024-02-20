/* Notes:
  s = source, d = destination
  sprite_ctx(image, sx, sy, sw, sh, dx, dy, dw, dh) For reference
  frame rate = time % staggerframes (^ stagger, slower animation)
*/

// Animation plane definition
const sprite = document.getElementById('pink_sprite');
const sprite_ctx = sprite.getContext('2d');
const CANVA_WIDTH = sprite.width = 600;
const CANVA_HEIGHT = sprite.height = 600;

// Sprite size
const spriteHeight = 32;
const spriteWidth = 32;

// Animation Frames
let gameFrame = 0;
const staggerFrames = 20;

// Sprite Idle Animation
const playerIdle = new Image();
playerIdle.src = 'sprites/Pink_Monster_Idle_4.png'

// Sprite Run Animation
const playerRun = new Image();
playerRun.src = 'sprites/Pink_Monster_Run_6.png';

// Sprite Walk Animation
const playerWalk = new Image();
playerWalk.src = 'sprites/Pink_Monster_Walk_6.png';

// Sprite Jump Animation
const playerJump = new Image();
playerJump.src = 'sprites/Pink_Monster_Jump_8.png';

// Sprite Attack 1 Animation
const playerAttack1 = new Image();
playerAttack1.src = 'sprites/Pink_Monster_Attack1_4.png';

// Sprite Animations Lists Definition:
const spriteAnimations = [];
const animationStatesList = [
  {
    name: 'idle',
    frames: 4,
  },
  {
    name: 'run',
    frames: 6,
  },
  {
    name: 'walk',
    frames: 6,
  },
  {
    name: 'jump',
    frames: 8,
  }
];

// Sprite Animation
let playerState = 'idle';
let playerAnimation = playerIdle;
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(selected){
  playerState = selected.target.value;
  playerAnimation = animationType(selected.target.value);
});


// Calculates the location of each sprite in sprite sheet
animationStatesList.forEach((state) => {
  let frames = {
    loc: []
   }
  
  // Loop to find location of each sprite based on frames in animationStatesList
  for(let i = 0; i < state.frames; i++){
    let positionX = i * spriteWidth;

    // Append to spriteAnimations
    frames.loc.push({x: positionX, y: 0});
  }
  // Names each animation
  spriteAnimations[state.name] = frames;
});

// Movement
let x = -50
let y = 300
let flag = true
// Animation
function animate(){
  // Clear canvas
  sprite_ctx.clearRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);

  // FrameRate calculation
  let position = Math.floor(gameFrame/staggerFrames) %
  spriteAnimations[playerState].loc.length;

  // Sprite Cropping x and y positions
  let frameX = spriteWidth*position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // Image on Canvas
  sprite_ctx.drawImage(
    playerAnimation, frameX, frameY, 
    spriteWidth, spriteHeight,   
    x, y, 64, 64); 
  
  // Recursion function
  requestAnimationFrame(animate);

  // Increase gameFrame (runtime in milis)
  gameFrame++;
  if(gameFrame > 10000){
    gameFrame = 0;
  }
  if (playerState == 'run'){
    x+=1.5;
  } else if (playerState == 'walk'){
    x++;
  } 
  
    

  if (x > 610){
    x = -50;
  }
};

// Function to find animation type
function animationType(spriteState){
  let animation;
  switch (spriteState) {
    
    case 'idle':
      animation = playerIdle;
      break;
    case 'jump':
      animation = playerJump;
      break;
    case 'run':
      animation = playerRun;
      break;
    case 'walk':
      animation = playerWalk;
      break;
  }
  return animation;
}


animate();