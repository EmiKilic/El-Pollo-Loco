class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinSound = new Audio("audio/collect_coin.mp3");
  bottleSound = new Audio("audio/toxin.mp3");
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
      this.checkCollisions();
      this.checkCollisionsEB();

      this.level.coin.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.character.hitCoin();
          this.statusBar.showCoin(this.character.money);
          console.log(this.character.money);
          this.level.coin.splice(index, 1);
          this.coinSound.play();
        }
      });
      this.level.bottle.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.character.hitBottle();
          this.statusBar.showBottle(this.character.bottle);
          console.log(this.character.bottle);
          this.level.bottle.splice(index, 1);
          this.bottleSound.play();
        }
      });
    }, 1000 / 60);

    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  checkBottomTopCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (this.character.isBottomCollidingWithTop(enemy)) {
          console.log("Character's bottom collided with the top of an enemy.");
          this.character.jump();
          enemy.hitEndboss();
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
            console.log("Enemy Hit");
            //
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
            console.log("Enemy Hit");
            this.object.splice(object, 1);
            enemy.hitEndboss();
          }
        }
      });
    });
  }

  checkThrowObjects() {
    if (this.keyboard.DButton && this.character.bottle > 0) {
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
        this.statusBar.setPercentage(this.character.energy);
        console.log("Collision with Character", this.character.energy);
      }
    });
  }
  checkCollisionsEB() {
    this.level.endboss.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log("Collision with Character", this.character.energy);
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
}
