/**
 * Represents the end boss enemy in the game.
 * Extends the {@link MovableObject} class, inheriting movement-related functionality and image-based animations.
 * The end boss has multiple states: alert, walking, attacking, hurt, and dead. It interacts with the player character and triggers specific behaviors when certain conditions are met.
 *
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /** @type {number} The height of the end boss (default is 450). */
  height = 450;

  /** @type {number} The width of the end boss (default is 450). */
  width = 450;

  /** @type {boolean} Indicates whether the game win sound has been played (default is false). */
  gameWinPlayed = false;

  /** @type {boolean} Indicates whether the alert animation has been triggered (default is false). */
  alertTriggered = false;

  /** @type {boolean} Indicates whether the end boss has started walking (default is false). */
  walkingStarted = false;

  /** @type {number[]} Array to store interval IDs */
  intervals = [];

  /** @type {string[]} Array of image paths for the alert animation. */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /** @type {string[]} Array of image paths for the walking animation. */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** @type {string[]} Array of image paths for the hurt animation. */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** @type {string[]} Array of image paths for the dead animation. */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /** @type {string[]} Array of image paths for the attack animation. */
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /** @type {number} The index of the current image being displayed for the end boss. */
  currentImage = 0;

  /** @type {boolean} Indicates whether the end boss's animation has started (default is false). */
  animationStarted = false;

  /** @type {Object} Reference to the player character. */
  player;

  /**
   * Creates a new Endboss instance, initializing its position, speed, and loading all images for various states.
   * The player character is passed as an argument to enable interaction.
   *
   * @param {Object} player - The player character that interacts with the end boss.
   */
  constructor(player) {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);

    this.x = 810 * 3;
    this.y = 20;
    this.speed = 20;

    this.player = player;

    this.animate();
  }

  /**
   * Plays the game win sound if it hasn't been played already, and pauses background sounds.
   */
  playSound() {
    if (!this.gameWinPlayed) {
      soundEffects.gameWin.play();
      this.gameWinPlayed = true;
      gameStarted = false;
      soundEffects.sound.pause();
      soundEffects.bossSpawn.pause();
    }
  }

  /**
   * Animates the end boss by checking its current state (dead, hurt, alert, walking, or attacking).
   * Plays the appropriate animation and moves the end boss accordingly.
   */
  animate() {
    const animationInterval = setInterval(() => {
      if (this.isDeadEndboss()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.fallEndboss();
        document.getElementById("GameWin").style.display = "block";
        this.playSound();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isColliding(world.character)) {
        this.playAnimationOnce(this.IMAGES_ATTACK);
      } else if (this.shouldTriggerAlert() && !this.alertTriggered) {
        this.playAlertAnimation();
      } else if (this.walkingStarted) {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
      }
    }, 200);

    this.intervals.push(animationInterval);
  }
  /**
   * Determines if the alert animation should be triggered based on the player's distance from the end boss.
   *
   * @returns {boolean} Whether the alert animation should be triggered.
   */
  shouldTriggerAlert() {
    const alertDistance = 620 * 3;
    return !this.alertTriggered && world.character.x >= alertDistance;
  }

  /**
   * Plays the alert animation for the end boss. Once the animation is complete, the walking animation starts.
   */
  playAlertAnimation() {
    if (!this.alertTriggered) {
      this.alertTriggered = true;
      soundEffects.bossSpawn.play();
      soundEffects.bossSpawn.loop = true;
      this.playAnimationOnce(this.IMAGES_ALERT, () => {
        this.walkingStarted = true;
      });
    }
  }

  /**
   * Plays an animation sequence once, then optionally executes a callback function upon completion.
   *
   * @param {string[]} images - An array of image paths to cycle through during the animation.
   * @param {Function} [callback] - A function to call when the animation completes.
   */
  playAnimationOnce(images, callback) {
    let i = 0;
    const interval = setInterval(() => {
      this.loadImage(images[i]);
      i++;
      if (i >= images.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 200);

    this.intervals.push(interval);
  }

  clearIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
  }
}
