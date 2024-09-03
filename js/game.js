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

    // Füge einen Klick-Event-Listener hinzu
    canvas.addEventListener('click', startGame);
}

function drawStartScreen() {
    // Canvas löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bild zeichnen (Pfad zu Ihrem Bild angeben)
    const startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png'; // Pfad zu Ihrem Bild
    startImage.onload = function() {
        // Bild auf die gesamte Canvas-Größe skalieren
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
    if (gameStarted) return; // Verhindert mehrfaches Starten des Spiels

    gameStarted = true;

    // Entferne den Klick-Event-Listener nach Spielstart
    canvas.removeEventListener('click', startGame);

    // Canvas leeren und das Spiel starten
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Welt und Spiel-Logik initialisieren
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
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

window.addEventListener('keyup', (e) => {
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
