const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

let frameCount = 1;
let obCount = frameCount;
const obXCoors = [];

const square = {

  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0

};

const nextFrame = () => {
  frameCount++;
  document.getElementById("level_number").innerHTML=frameCount;
  
  for (let i = 0; i < obCount; i++) {
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }
  
}


const controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 65:
        controller.left = key_state;
        break;
      case 87:
        controller.up = key_state;
        break;
      case 68:
        controller.right = key_state;
        break;

    }

  }

};

const loop = function () {

  if (controller.up && square.jumping == false) {

    square.yVelocity -= 20;
    square.jumping = true;

  }

  if (controller.left) {

    square.xVelocity -= 0.5;

  }

  if (controller.right) {

    square.xVelocity += 0.5;

  }

  square.yVelocity += 1.5;
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9;
  square.yVelocity *= 0.9;

  if (square.y > 386 - 16 - 32) {

    square.jumping = false;
    square.y = 386 - 16 - 32;
    square.yVelocity = 0;

  }

  if (square.x < 0) {

    square.x = 0;

  } else if (square.x > 1220) {

    square.x = -20;
    nextFrame();

  }
  context.fillStyle = "#201A23";
  context.fillRect(0, 0, 1220, 400);


  context.fillStyle = "#7a3f62";
  context.beginPath();
  context.rect(square.x, square.y, square.width, square.height);
  context.fill();


  const height = 200 * Math.cos(Math.PI / 6);
  context.fillStyle = "#ff5174";
  obXCoors.forEach((obXCoor) => {
    context.beginPath();
    context.rect(obXCoor, 339, 32, 32);
    context.closePath();
    context.fill();
  })


  context.strokeStyle = "#413a43";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

