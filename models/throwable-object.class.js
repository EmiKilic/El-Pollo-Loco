/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * Extends the {@link MovableObject} class, inheriting movement and gravity-related mechanics.
 * The object rotates as it moves and has a splash animation when it lands.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /** @type {string[]} Array of image paths for the bottle's rotation animation. */
  IMAGE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /** @type {string[]} Array of image paths for the bottle's splash animation upon impact. */
  IMAGE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject instance, setting its initial position and starting the throw.
   * 
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGE_ROTATION);
    this.loadImages(this.IMAGE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;

    this.throw();
  }

  /**
   * Initiates the throw by applying gravity and making the object move to the right.
   * The bottle also rotates as it moves, cycling through its rotation images.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      this.x += 10;
    }, 25);

    setInterval(() => {
      this.playAnimation(this.IMAGE_ROTATION);
    }, 100);
  }
}
