class Endboss extends MovableObject {
  height = 450;
  width = 450;
  gameWin = new Audio("audio/win.mp3");
  gameWinPlayed = false;
  alertTriggered = false;
  walkingStarted = false;

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

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

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
  currentImage = 0;
  animationStarted = false;

  constructor(player) {
    // Add player as an argument
    super().loadImage(this.IMAGES_ALERT[0]); // Start with the alert image
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 810 * 3;
    this.y = 20;
    this.speed = 2.5;

    this.player = player; // Store player reference

    this.animate();
  }

  playSound() {
    if (!this.gameWinPlayed) {
      this.gameWin.play();
      this.gameWinPlayed = true;
      gameStarted = false;
    }
  }

  animate() {
    setInterval(() => {
      if (this.isDeadEndboss()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.fallEndboss();
        document.getElementById("GameWin").style.display = "block";
        this.playSound();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.shouldTriggerAlert() && !this.alertTriggered) {
        this.playAlertAnimation(); // Trigger the alert animation once
      } else if (this.walkingStarted) {
        // Only start walking after the alert finishes
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
      }
    }, 200); // Main game loop checking every 200ms
  }

  shouldTriggerAlert() {
    const alertDistance = 700 * 3; // Adjust this threshold to your needs
    return !this.alertTriggered && world.character.x >= alertDistance;
  }

  playAlertAnimation() {
    if (!this.alertTriggered) {
      this.alertTriggered = true; // Ensure this only runs once
      this.playAnimationOnce(this.IMAGES_ALERT, () => {
        // After alert finishes, start walking
        this.walkingStarted = true;
      });
    }
  }

  // Helper function to play animation once and then execute a callback
  playAnimationOnce(images, callback) {
    let i = 0;
    const interval = setInterval(() => {
      this.loadImage(images[i]);
      i++;
      if (i >= images.length) {
        clearInterval(interval); // Stop animation after all frames are played
        if (callback) callback(); // Execute callback if provided
      }
    }, 200); // Assuming 200ms per frame
  }
}
