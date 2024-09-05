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
let gameWin = new Audio("audio/win.mp3");
let jumpUp = new Audio("audio/jump.mp3");
let loose = new Audio("audio/loose.mp3");
let walking_sound = new Audio("audio/walking.mp3");
let bossSpawn = new Audio("audio/bossSpawn.mp3");
let sleep = new Audio("audio/sleep.mp3");
let gameStarted = false;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  drawStartScreen();
}

function reloadCanvas() {
  location.reload();
}

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startImage = new Image();
  startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
  startImage.onload = function () {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
  };
}

function startGame() {
  if (gameStarted) return;
  initLevel();
  document.getElementById("startButton").style.display = "none";
  sound.play();
  sound.loop = true;
  gameStarted = true;

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
    loose.muted = true;
    jumpUp.muted = true;
    bossSpawn.muted = true;
    sleep.muted = true;
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
    loose.muted = false;
    jumpUp.muted = false;
    bossSpawn.muted = false;
    sleep.muted = false;
  }
}

function toggleFullscreen() {
  const elem = document.documentElement;
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

window.addEventListener("keydown", (e) => {
  if (!gameStarted) return;

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
});

window.addEventListener("keyup", (e) => {
  if (!gameStarted) return;

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
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("btnLeft").addEventListener("touchend", () => {
    if (!gameStarted) return;
    keyboard.LEFT = false;
  });

  document.getElementById("btnRight").addEventListener("touchstart", () => {
    if (!gameStarted) return;
    keyboard.RIGHT = true;
  });
  document.getElementById("btnRight").addEventListener("touchend", () => {
    if (!gameStarted) return;
    keyboard.RIGHT = false;
  });

  document.getElementById("btnUp").addEventListener("touchstart", () => {
    if (!gameStarted) return;
    keyboard.UP = true;
  });
  document.getElementById("btnUp").addEventListener("touchend", () => {
    if (!gameStarted) return;
    keyboard.UP = false;
  });

  document.getElementById("btnThrow").addEventListener("touchstart", () => {
    if (!gameStarted) return;
    keyboard.SPACE = true;
  });
  document.getElementById("btnThrow").addEventListener("touchend", () => {
    if (!gameStarted) return;
    keyboard.SPACE = false;
  });
});

function checkOrientation() {
  const rotateMessage = document.getElementById("rotateMessage");

  if (window.innerHeight > window.innerWidth) {
    rotateMessage.style.display = "block";
  } else {
    rotateMessage.style.display = "none";
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
