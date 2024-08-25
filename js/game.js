let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 32: // SPACE (Bubble Attack)
      if (!keyboard.SPACE) {
        keyboard.SPACE = true;
      }
      break;
    case 68: // DButton (Slap Attack)
      if (!keyboard.DButton) {
        keyboard.DButton = true;
      }
      break;
    case 40: // DOWN
      keyboard.DOWN = true;
      break;
    case 38: // UP
      keyboard.UP = true;
      break;
    case 39: // RIGHT
      keyboard.RIGHT = true;
      break;
    case 37: // LEFT
      keyboard.LEFT = true;
      break;
    default:
      // Handle other keys if necessary
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.keyCode) {
    case 40: // DOWN
      keyboard.DOWN = false;
      break;
    case 38: // UP
      keyboard.UP = false;
      break;
    case 39: // RIGHT
      keyboard.RIGHT = false;
      break;
    case 37: // LEFT
      keyboard.LEFT = false;
      break;
    default:
      break;
    case 32: // SPACE (Bubble Attack)
      keyboard.SPACE = false;

      break;
    case 68: // DButton (Slap Attack)
      keyboard.DButton = false;

      break;
  }
});
