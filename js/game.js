let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
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
  } else {
    audioIcon.src = "img/10.Buttons/Audio.png";
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
