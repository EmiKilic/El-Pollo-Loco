class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinSound = new Audio("audio/collect_coin.mp3");
  toxinSound = new Audio("audio/toxin.mp3");
  hit = new Audio(
    "https://cdn.freesound.org/previews/270/270327_5123851-lq.mp3"
  );
  object = [new ThrowableObject()];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.checkBubble();
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          this.hit.play();
          console.log("Collision with Character", this.character.energy);
        }
      });
      this.level.coin.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.character.hitCoin();
          this.statusBar.showCoin(this.character.money);
          console.log(this.character.money);
          this.level.coin.splice(index, 1);
          this.coinSound.play();
        }
      });
      this.level.toxin.forEach((toxin, index) => {
        if (this.character.isColliding(toxin)) {
          this.character.hitToxin();
          this.statusBar.showPoison(this.character.toxin);
          console.log(this.character.toxin);
          this.level.toxin.splice(index, 1);
          this.toxinSound.play();
        }
      });
      this.level.enemies.forEach((enemy) => {
        this.object.forEach((obj, index) => {
          if (obj.isColliding(enemy)) {
            console.log("Collision with enemy", this.level.enemies);
            this.object.splice(index, 1); 
            this.level.enemies.splice(index, 1);
          }
        });
      });
    }, 50 );
  }


  checkBubble() {
    if (this.keyboard.SPACE) {
      let bubble = new ThrowableObject(
        this.character.x + 70,
        this.character.y + 15
      );
      this.object.push(bubble);  
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.light);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.toxin);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.object);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
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
