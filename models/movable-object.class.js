class MovableObject extends DrawableObject {
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  money = 0;
  toxin = 0;

  // Assuming you have a global state or game manager
  globalGameState = {
    endbossAnimationStarted: false,
  };

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
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

  hitToxin() {
    if (this.toxin < 5) {
      this.toxin += 1;
      if (this.toxin > 5) {
        this.toxin = 5;
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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
