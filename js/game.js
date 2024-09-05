let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let damage = new Audio("audio/damage.mp3");
let sound = new Audio("audio/backgroundmusic.mp3");
let coinSound = new Audio("audio/collect_coin.mp3");
let bottleSound = new Audio("audio/toxin.mp3");
let chickenDead = new Audio("audio/chickenDead.mp3");
let shatter = new Audio("audio/bottleShatter.mp3");
let gameWin = new Audio('audio/win.mp3');
let jumpUp = new Audio('audio/jump.mp3');
let loose = new Audio('audio/loose.mp3');
let walking_sound = new Audio("audio/walking.mp3");
let bossSpawn = new Audio('audio/bossSpawn.mp3');
let gameStarted = false;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Zeichne den Startbildschirm
  drawStartScreen();
}

function reloadCanvas() {
  location.reload();
}

function drawStartScreen() {
  // Canvas löschen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bild zeichnen (Pfad zu Ihrem Bild angeben)
  const startImage = new Image();
  startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png"; // Pfad zu Ihrem Bild
  startImage.onload = function () {
    // Bild auf die gesamte Canvas-Größe skalieren
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
  };
}

function startGame() {
  if (gameStarted) return;
  initLevel();
  document.getElementById("startButton").style.display = "none";

  gameStarted = true;
  if (gameStarted) {
    sound.play();
    sound.loop = true;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world = new World(canvas, keyboard);
}

function toggleSettings() {
  const popup = document.getElementById("settingsPopup");

  if (popup.style.display === "none" || popup.style.display === "") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
}

function muteSounds() {
  var audioIcon = document.getElementById("audioEmblem");

  if (audioIcon.src.includes("Audio.png")) {
    audioIcon.src = "img/10.Buttons/Stumm.png";
    sound.pause();
    damage.muted = true;
    coinSound.muted = true;
    bottleSound.muted = true;
    chickenDead.muted = true;
    shatter.muted = true;
    gameStarted.muted = true;
    gameWin.muted = true;
    walking_sound.muted = true;
    loose.muted = true
    jumpUp.muted = true;
    bossSpawn.muted = true;
  } else {
    audioIcon.src = "img/10.Buttons/Audio.png";
    sound.play();
    damage.muted = false;
    coinSound.muted = false;
    bottleSound.muted = false;
    chickenDead.muted = false;
    shatter.muted = false;
    gameStarted.muted = false;
    gameWin.muted = false;
    walking_sound.muted = false;
    loose.muted = false
    jumpUp.muted = false;
    bossSpawn.muted = false;
  }
}

function toggleFullscreen() {
  const elem = document.documentElement; // Use the entire document as the fullscreen element

  // Check if the document is already in fullscreen mode
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // If not in fullscreen, enter fullscreen mode
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    // If in fullscreen, exit fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
}

window.addEventListener("keydown", (e) => {
  if (!gameStarted) return; // Ignoriere Tastatureingaben, wenn das Spiel nicht gestartet ist

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.DButton = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (!gameStarted) return; // Ignoriere Tastatureingaben, wenn das Spiel nicht gestartet ist

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.DButton = false;
  }
});
