/**
 * Represents the game world, handling the player character, objects, enemies, and interactions between them.
 * This class manages the canvas, keyboard inputs, game logic, and rendering of all game objects.
 */
class World {
  /** @type {Character} The main player character. */
  character = new Character();

  /** @type {Level} The current level being played. */
  level = level1;

  /** @type {HTMLCanvasElement} The canvas element used for rendering the game. */
  canvas;

  /** @type {CanvasRenderingContext2D} The 2D context for drawing on the canvas. */
  ctx;

  /** @type {Keyboard} The current state of the keyboard inputs. */
  keyboard;

  /** @type {number} The current position of the camera on the x-axis (default is 0). */
  camera_x = 0;

  /** @type {StatusBar} The status bar displaying health, coins, and bottles. */
  statusBar = new StatusBar();

  /** @type {ThrowableObject[]} Array of throwable objects, such as bottles, that can be thrown by the player. */
  object = [];

  /**
   * Creates a new instance of the game world, setting up the canvas, keyboard inputs, and running the game loop.
   * 
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Keyboard} keyboard - The current state of keyboard inputs.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Starts the game loop by running collision checks and game updates at different intervals.
   */
  run() {
    setInterval(() => {
      this.checkBottomTopCollision();
      this.checkCollisionsThrowable();
      this.checkCollisionsEndboss();
    }, 10);

    setInterval(() => {
      this.checkCollisionCoin();
      this.checkCollisionBottle();
    }, 1000 / 60);

    setInterval(() => {
      this.checkCollisions();
      this.GameOver();
      this.checkCollisionsEB();
    }, 400);

    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  /**
   * Checks for collisions between the character and collectible coins.
   * When a coin is collected, it is removed from the level, and the player's coin count is updated.
   */
  checkCollisionCoin() {
    this.level.coin.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.hitCoin();
        this.statusBar.showCoin(this.character.money);
        this.level.coin.splice(index, 1);
        soundEffects.coinSound.play();
      }
    });
  }

  /**
   * Checks for collisions between the character and collectible bottles.
   * When a bottle is collected, it is removed from the level, and the player's bottle count is updated.
   */
  checkCollisionBottle() {
    this.level.bottle.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.hitBottle();
        this.statusBar.showBottle(this.character.bottle);
        this.level.bottle.splice(index, 1);
        soundEffects.bottleSound.play();
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies when jumping on them.
   * When the character lands on an enemy, the enemy is damaged, and the character jumps.
   */
  checkBottomTopCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (
          this.character.isBottomCollidingWithTop(enemy) &&
          this.character.speedY < 0           
        ) {
          this.character.jump();
          enemy.hitEndboss();
          soundEffects.chickenDead.play();
          setInterval(() => {
            enemy.fall();
          }, 50);
        }
      }
    });
    let previousY = this.character.y;
  }
  
  /**
   * Checks for collisions between throwable objects (such as bottles) and enemies.
   * When a throwable object hits an enemy, the enemy is defeated.
   */
  checkCollisionsThrowable() {
    this.object.forEach((object) => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead()) {
          if (object.isCollidingThrowableObject(enemy)) {
            soundEffects.shatter.play();
            soundEffects.chickenDead.play();
            this.object.splice(object);
            enemy.died();
            setInterval(() => {
              enemy.fall();
            }, 50);
          }
        }
      });
    });
  }

  /**
   * Checks for collisions between throwable objects and the end boss.
   * If a throwable object hits the end boss, the boss takes damage.
   */
  checkCollisionsEndboss() {
    this.object.forEach((object) => {
      this.level.endboss.forEach((enemy) => {
        if (!enemy.isDead()) {
          if (object.isCollidingThrowableObject(enemy)) {
            soundEffects.shatter.play();
            soundEffects.chickenDead.play();
            this.object.splice(object, 1);
            enemy.hitEndboss();
          }
        }
      });
    });
  }

  /**
   * Handles the throwing of objects by the player when the spacebar is pressed and bottles are available.
   */
  checkThrowObjects() {
    if (
      this.keyboard.SPACE &&
      this.character.bottle > 0 &&
      this.character.otherDirection == false
    ) {
      let bottle = new ThrowableObject(
        this.character.x + this.camera_x,
        this.character.y
      );
      this.object.push(bottle);
      this.character.bottle--;
      this.statusBar.bottle--;
      this.statusBar.showBottle(this.statusBar.bottle);
    }
  }

  /**
   * Checks for collisions between the character and enemies, causing the player to take damage when hit.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        soundEffects.damage.play();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks for collisions between the character and the end boss, causing the player to take damage when hit.
   */
  checkCollisionsEB() {
    this.level.endboss.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        soundEffects.damage.play();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Sets up the world by associating the character with the game world.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * The main draw loop for the game. It clears the canvas, draws all game elements (character, enemies, objects, etc.), and updates the screen.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottle);
    this.addObjectsToMap(this.level.endboss);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.object);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the canvas.
   * 
   * @param {MovableObject[]} objects - The array of objects to be drawn.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single movable object to the canvas, flipping the image if necessary.
   * 
   * @param {MovableObject} mo - The movable object to be drawn.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the object's image horizontally before drawing it.
   * 
   * @param {MovableObject} mo - The movable object to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the horizontal flip after drawing the object.
   * 
   * @param {MovableObject} mo - The movable object to be flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Checks if the game is over and displays the Game Over screen if the character has no energy left.
   */
  GameOver() {
    const over = document.getElementById("GameOver");
    if (this.character.energy == 0) {
      over.style.display = "block";
      gameStarted = false;
      soundEffects.sound.pause();
      soundEffects.damage.pause();
    } else {
      over.style.display = "none";
    }
  }
}
