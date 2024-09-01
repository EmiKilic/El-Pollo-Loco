class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  money = 0;
  bottle = 0;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  jump() {
    return (this.speedY = 30);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 91;
    }
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(imgs) {
    let i = this.currentImage % imgs.length;
    let path = imgs[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  isCollidingThrowableObject(mo) {
    return (
      world.character.x + this.x + this.width > mo.x &&
      world.character.y + this.y + this.height > mo.y &&
      world.character.x + this.x < mo.x + mo.width &&
      world.character.y + this.y < mo.y + mo.height
    );
  }

  isBottomCollidingWithTop(mo) {
    return (
      this.x + this.width > mo.x && // Right edge of the character is past the left edge of `mo`
      this.x < mo.x + mo.width && // Left edge of the character is before the right edge of `mo`
      this.y + this.height >= mo.y && // Bottom edge of the character is at or below the top edge of `mo`
      this.y + this.height <= mo.y + mo.height // Bottom edge of the character is still within the height of `mo` (to ensure it's actually colliding with the top)
    );
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hitCoin() {
    if (this.money < 5) {
      this.money += 1;
      if (this.money > 5) {
        this.money = 5;
      }
    }
  }

  hitBottle() {
    if (this.bottle < 5) {
      this.bottle += 1;
      console.log(this.bottle);

      if (this.bottle > 5) {
        this.bottle = 5;
      }
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  died() {
    this.energy = 0;
  }
}
