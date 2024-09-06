/**
 * Represents a movable object in the game, capable of interacting with gravity, movement, and collisions.
 * Extends the {@link DrawableObject} class, inheriting image-related functionality. Adds movement, physics (gravity), and hit detection mechanics.
 * 
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {number} The base movement speed of the object (default is 0.15). */
  speed = 0.15;

  /** @type {boolean} Indicates whether the object is facing in the opposite direction (default is false). */
  otherDirection = false;

  /** @type {number} The current vertical speed, used for jumping and falling. */
  speedY = 0;

  /** @type {number} The rate at which the object accelerates downwards (default is 2.5). */
  acceleration = 2.5;

  /** @type {number} The object's energy or health points (default is 100). */
  energy = 100;

  /** @type {number} The amount of money (or coins) collected by the object (default is 0). */
  money = 0;

  /** @type {number} The number of bottles collected by the object (default is 0). */
  bottle = 0;

  /** @type {number} Timestamp of the last time the object was hit. */
  lastHit = 0;



  /**
   * Applies gravity to the object, continuously adjusting its vertical position.
   * This method is invoked in intervals, causing the object to fall if it's above the ground or if it's jumping.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Causes the object to jump by setting its vertical speed.
   * 
   * @returns {number} The new vertical speed, typically used to initiate a jump.
   */
  jump() {
    return (this.speedY = 25);
  }

  /**
   * Determines if the object is above the ground. For throwable objects, it always returns true.
   * 
   * @returns {boolean} Whether the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 190;
    }
  }

  /**
   * Moves the object to the right by increasing its x-coordinate based on its speed.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays an animation by cycling through an array of image paths and displaying each one in sequence.
   * 
   * @param {string[]} imgs - Array of image paths to be cycled through for the animation.
   */
  playAnimation(imgs) {
    let i = this.currentImage % imgs.length;
    let path = imgs[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Checks if the object is colliding with another movable object based on their position and dimensions.
   * 
   * @param {MovableObject} mo - The other movable object to check collision against.
   * @returns {boolean} Whether the object is colliding with the other object.
   */
  isColliding(mo) {
    return (
      this.x + this.width - 20> mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y + 100 < mo.y + mo.height
    );
  }

  /**
   * Checks if the object is colliding with another object specifically in the context of throwable objects.
   * 
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} Whether the object is colliding with the other object.
   */
  isCollidingThrowableObject(mo) {
    return (
      this.x + this.width > mo.x &&
      + this.y + this.height> mo.y &&
      this.x < mo.x + mo.width -50 &&
      + this.y < mo.y + mo.height
    );
  }

  /**
   * Checks if the bottom of the object is colliding with the top of another object.
   * 
   * @param {MovableObject} mo - The other object to check for collision.
   * @returns {boolean} Whether the object's bottom is colliding with the other object's top.
   */
  isBottomCollidingWithTop(mo) {
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height -12 >= mo.y &&
      this.y + this.height -12 <= mo.y + mo.height
    );
  }

  /**
   * Reduces the object's energy by a fixed amount when it is hit.
   * If the energy reaches zero, the object is considered dead.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Reduces the end boss's energy when hit, with a minimum energy level of 40.
   */
  hitEndboss() {
    this.energy -= 20;
    if (this.energy < 40) {
      this.energy = 40;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increases the object's money (or coin count) when a coin is collected, up to a maximum of 5.
   */
  hitCoin() {
    if (this.money < 5) {
      this.money += 1;
      if (this.money > 5) {
        this.money = 5;
      }
    }
  }

  /**
   * Increases the object's bottle count when a bottle is collected, up to a maximum of 5.
   */
  hitBottle() {
    if (this.bottle < 5) {
      this.bottle += 1;
      if (this.bottle > 5) {
        this.bottle = 5;
      }
    }
  }

  /**
   * Determines if the object is currently hurt based on the time passed since the last hit.
   * 
   * @returns {boolean} Whether the object is currently hurt.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead by verifying if its energy is zero.
   * 
   * @returns {boolean} Whether the object is dead.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the end boss is considered dead by verifying if its energy is at 40.
   * 
   * @returns {boolean} Whether the end boss is dead.
   */
  isDeadEndboss() {
    return this.energy === 40;
  }

  /**
   * Sets the object's energy to zero, indicating that it has died.
   */
  died() {
    this.energy = 0;
  }

  /**
   * Causes the object to fall by increasing its y-coordinate by 5, simulating a fall.
   */
  fall() {
    this.y += 5;
  }

  /**
   * Causes the end boss to fall by increasing its y-coordinate by 20, simulating a faster fall.
   */
  fallEndboss() {
    this.y += 20;
  }
}
