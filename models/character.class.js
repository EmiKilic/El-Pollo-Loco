/**
 * Represents the main character in the game.
 * Extends the {@link MovableObject} class, inheriting movement-related functionality such as walking, jumping, and gravity application.
 * The character can walk, jump, be hurt, die, and animate various states like idle or sleeping.
 * 
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} The height of the character (default is 250). */
  height = 250;
  
  /** @type {number} The width of the character (default is 100). */
  width = 100;

  /** @type {number} The y-coordinate of the character (default is 0). */
  y = 0;
  
  /** @type {number} The x-coordinate of the character (default is 0). */
  x = 0;

  /** @type {number} The speed at which the character moves (default is 10). */
  speed = 10;

  /** @type {boolean} Whether the game loose sound has been played (default is false). */
  gameLoosePlayed = false;

  /** @type {number} The time of the last action taken by the character. */
  lastActionTime = new Date().getTime();

  /** @type {number} The time limit for the character to remain idle before playing idle animation (default is 10000 ms). */
  idleTimeLimit = 10000;

  /** @type {boolean} Indicates whether the character is currently walking. */
  isWalking = false;

  /** @type {Object} Reference to the world object, which includes game mechanics like the camera and keyboard inputs. */
  world;

  /** @type {string[]} Array of image paths for the character's walking animation. */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} Array of image paths for the character's jumping animation. */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} Array of image paths for the character's dead animation. */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} Array of image paths for the character's hurt animation. */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} Array of image paths for the character's idle/waiting animation. */
  IMAGE_WAITING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Creates a new Character instance, loading images for various states (walking, jumping, hurt, dead, waiting).
   * It also starts the character's animation and applies gravity.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    [
      this.IMAGES_WALKING,
      this.IMAGES_JUMPING,
      this.IMAGES_DEAD,
      this.IMAGES_HURT,
      this.IMAGE_WAITING,
    ].forEach((imgs) => this.loadImages(imgs));
    this.animate();
    this.applyGravity();
  }

  /**
   * Plays the game over sound if it hasn't already been played.
   * It also sets the `gameLoosePlayed` flag to true and stops the game.
   */
  playSound() {
    if (!this.gameLoosePlayed) {
      soundEffects.loose.play();
      this.gameLoosePlayed = true;
      gameStarted = false;
    }
  }

  /**
   * Animates the character by checking for various actions (walking, jumping, idle) and plays appropriate animations.
   * It also handles character movement based on keyboard inputs.
   */
  animate() {
    setInterval(() => {
      let moving = false;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 4) {
        this.moveRight();
        moving = true;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        moving = true;
        this.otherDirection = true;
      }
      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
        soundEffects.jumpUp.play();
      }
      this.world.camera_x = -this.x + 100;
      if (moving !== this.isWalking) {
        moving ? soundEffects.walking.play() : soundEffects.walking.pause();
        this.isWalking = moving;
      }
      if (moving) this.lastActionTime = new Date().getTime();
    }, 1000 / 60);

    setInterval(() => {
      const idleDuration = new Date().getTime() - this.lastActionTime;
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.fall();
        this.playSound();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (idleDuration > this.idleTimeLimit) {
        this.playAnimation(this.IMAGE_WAITING);
        soundEffects.sleep.play();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }
}
