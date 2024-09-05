class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  object = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkBottomTopCollision();
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

  checkBottomTopCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (this.character.isBottomCollidingWithTop(enemy)) {
          this.character.jump();
          enemy.hitEndboss();
          soundEffects.chickenDead.play();
          setInterval(() => {
            enemy.fall();
          }, 50);
          setTimeout(() => {
            let position = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(position, 0);
          }, 1000);
        }
      }
    });
  }

  checkCollisionsThrowable() {
    this.object.forEach((object) => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead()) {
          if (object.isCollidingThrowableObject(enemy)) {
            soundEffects.shatter.play();
            this.object.splice(object);
            enemy.died();
            setTimeout(() => {
              let position = this.level.enemies.indexOf(enemy);
              this.level.enemies.splice(position, 1);
            }, 1000 / 60);
          }
        }
      });
    });
  }

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
    this.checkCollisionsThrowable();
    this.checkCollisionsEndboss();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        soundEffects.damage.play();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsEB() {
    this.level.endboss.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        soundEffects.damage.play();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  setWorld() {
    this.character.world = this;
  }

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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

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
