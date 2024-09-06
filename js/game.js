/**
 * Global variables and game state.
 */
let canvas, character, ctx, world, gameStarted = false;
let keyboard = new Keyboard();

/**
 * Sound effects used in the game.
 * @type {Object}
 */
let soundEffects = {
  damage: new Audio("audio/damage.mp3"),
  sound: new Audio("audio/backgroundmusic.mp3"),
  coinSound: new Audio("audio/collect_coin.mp3"),
  bottleSound: new Audio("audio/toxin.mp3"),
  chickenDead: new Audio("audio/chickenDead.mp3"),
  shatter: new Audio("audio/bottleShatter.mp3"),
  gameWin: new Audio("audio/win.mp3"),
  jumpUp: new Audio("audio/jump.mp3"),
  loose: new Audio("audio/loose.mp3"),
  walking: new Audio("audio/walking.mp3"),
  bossSpawn: new Audio("audio/bossSpawn.mp3"),
  sleep: new Audio("audio/sleep.mp3")
};

/**
 * Initializes the game by setting up the canvas and drawing the start screen.
 */
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  drawStartScreen();
}

  /**
   * Restarts the game by resetting the game state and returning to the start screen.
   */
  function restartGame() {
    // Stop all sounds
    Object.values(soundEffects).forEach(sound => sound.pause());

    // Clear the world and canvas
    world = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reinitialize the world and level
    initLevel();
    world = new World(canvas, keyboard);

    world.character.energy = 100;  // Reset the energy to full
    world.character.lastHit = 0; 

    // Hide the GameOver screen and reset flags
    gameStarted = true;
    isGameOver = false;
    startGame();
}
/**
 * Draws the start screen image onto the canvas.
 */
function drawStartScreen() {
  const startImage = new Image();
  startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
  startImage.onload = () => ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
}

/**
 * Starts the game by initializing the level, hiding the start button,
 * and setting up the World instance and game state.
 */
function startGame() {
  if (gameStarted) return;
  initLevel();
  document.getElementById("startButton").style.display = "none";
  soundEffects.sound.play(); 
  soundEffects.sound.loop = true;
  gameStarted = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
}

/**
 * Toggles the display of the settings popup.
 */
function toggleSettings() {
  const popup = document.getElementById("settingsPopup");
  popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

/**
 * Mutes or unmutes all game sounds.
 */
function muteSounds() {
  const audioIcon = document.getElementById("audioEmblem");
  const isMuted = audioIcon.src.includes("Audio.png");
  audioIcon.src = isMuted ? "img/10.Buttons/Stumm.png" : "img/10.Buttons/Audio.png";
  Object.values(soundEffects).forEach(sound => sound.muted = isMuted);
  if (!isMuted) soundEffects.sound.play();
}

/**
 * Event listener for keyboard keydown events. Updates the `keyboard` object based on key presses.
 * @param {KeyboardEvent} e - The keydown event object.
 */
window.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 40) keyboard.DOWN = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
});

/**
 * Event listener for keyboard keyup events. Updates the `keyboard` object when keys are released.
 * @param {KeyboardEvent} e - The keyup event object.
 */
window.addEventListener("keyup", (e) => {
  if (!gameStarted) return;
  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40) keyboard.DOWN = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
});

/**
 * Sets up touch event listeners for mobile controls.
 */
document.addEventListener("DOMContentLoaded", function () {
  ["btnLeft", "btnRight", "btnUp", "btnSpace"].forEach(id => {
    document.getElementById(id).addEventListener("touchstart", () => keyboard[id.replace('btn', '').toUpperCase()] = true);
    document.getElementById(id).addEventListener("touchend", () => keyboard[id.replace('btn', '').toUpperCase()] = false);
  });
});

/**
 * Checks if the screen orientation is landscape and displays a rotate message if needed.
 */
function checkOrientation() {
  document.getElementById("rotateMessage").style.display = window.innerHeight > window.innerWidth ? "block" : "none";
}

/**
 * Adds event listeners for screen orientation changes and resize events to check the orientation.
 */
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

function toggleImp() {
  const impInfo = document.getElementById('impInfo');
  impInfo.style.display = (impInfo.style.display === 'block') ? 'none' : 'block';
}

function closeImp() {
  document.getElementById('impInfo').style.display == 'none';
}
