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
  throwableObjects = [];



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
      this.checkCollisions();
      this.checkThrowObjects();
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
    }, 200 );
  }

  checkThrowObjects() {
    if (this.keyboard.DButton) {
      let bottle = new ThrowableObject(200, 200)
      this.throwableObjects.push(bottle);
    }
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


    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.throwableObjects);

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
