let canvas, ctx, world, gameStarted = false;
let keyboard = new Keyboard();
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

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  drawStartScreen();
}

function reloadCanvas() {
  location.reload();
}

function drawStartScreen() {
  const startImage = new Image();
  startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
  startImage.onload = () => ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
}

function startGame() {
  if (gameStarted) return;
  initLevel();
  document.getElementById("startButton").style.display = "none";
  soundEffects.sound.play(); soundEffects.sound.loop = true;
  gameStarted = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
}

function toggleSettings() {
  const popup = document.getElementById("settingsPopup");
  popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

function muteSounds() {
  const audioIcon = document.getElementById("audioEmblem");
  const isMuted = audioIcon.src.includes("Audio.png");
  audioIcon.src = isMuted ? "img/10.Buttons/Stumm.png" : "img/10.Buttons/Audio.png";
  Object.values(soundEffects).forEach(sound => sound.muted = isMuted);
  if (!isMuted) soundEffects.sound.play();
}

function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.() || elem.webkitRequestFullscreen?.() || elem.msRequestFullscreen?.();
  } else {
    document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
  }
}

window.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 40) keyboard.DOWN = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
});

window.addEventListener("keyup", (e) => {
  if (!gameStarted) return;
  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40) keyboard.DOWN = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
});

document.addEventListener("DOMContentLoaded", function () {
  ["btnLeft", "btnRight", "btnUp", "btnThrow"].forEach(id => {
    document.getElementById(id).addEventListener("touchstart", () => keyboard[id.replace('btn', '').toUpperCase()] = true);
    document.getElementById(id).addEventListener("touchend", () => keyboard[id.replace('btn', '').toUpperCase()] = false);
  });
});

function checkOrientation() {
  document.getElementById("rotateMessage").style.display = window.innerHeight > window.innerWidth ? "block" : "none";
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
