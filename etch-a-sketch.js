//select elements on page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const shakeButtonRight = document.querySelector('.shake-right');
const MOVE_AMOUNT = 20;

//setup our canvas for drawing
const {width, height} = canvas; //make a variable called height and width from the same properties on our canvas


//create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width); //random starting point for x or width
let y = Math.floor(Math.random() * height); //random starting point for y or height

ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); //start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//write a draw function
function draw({key}) {
  console.log(key);
  //start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  //move our x and y values depending on what the user did
  switch (key) {
    case 'ArrowUp':
    y -= MOVE_AMOUNT;
    break;
    case 'ArrowRight':
    x += MOVE_AMOUNT;
    break;
    case 'ArrowDown':
    y += MOVE_AMOUNT;
    break;
    case 'ArrowLeft':
    x -= MOVE_AMOUNT;
    break;
    default:
      break;
  }
  ctx.lineTo(x,y);
  ctx.stroke();
}

//write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({key: e.key});
  }
}

//clean/shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0,0, width, height);
  canvas.addEventListener(
    'animationend', 
  function() {
    console.log('Done the shake!');
    canvas.classList.remove('shake');
  },
  {once: true}
  );
}

//shake button right
function clearCanvasRight() {
  canvas.classList.add('shake-right');
  ctx.clearRect(0,0, width, height);
  canvas.addEventListener('animationend',
  function() {
    canvas.classList.remove('shake-right');
  },
  {once: true}
  );
}

//listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
shakeButtonRight.addEventListener('click', clearCanvasRight);
