class Character extends MovableObject {
  width = 150;
  height = 80;
  x = 0;
  y = 220;
  speed = 4;

  // IMAGES_SWIMMING 
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  //IMAGES_BUBBLE_ATTACK
  IMAGES_JUMP = [
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

  //IMAGES_FINSLAP_ATTACK
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  world;
  //swimming_sound 
  walking_sound = new Audio("audio/swimming.mp3");
  //bubbleAttack_sound 
  attack_sound = new Audio("audio/bubble.mp3");
  // slapAttack_sound = new Audio("audio/slap.mp3");
  isWalking = false;
  attack = false;
  // slapAttack = false;

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_IDLE);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let moving = false;

      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x * 4
      ) {
        this.x += this.speed;
        this.otherDirection = false;
        moving = true;
      }
      if (this.world.keyboard.LEFT && this.x > -690) {
        this.x -= this.speed;
        this.otherDirection = true;
        moving = true;
      }
      this.world.camera_x = -this.x + 20;
      if (this.world.keyboard.UP && this.y > 0) {
        this.y -= this.speed;
        moving = true;
      }
      if (this.world.keyboard.DOWN && this.y < 400) {
        this.y += this.speed;
        moving = true;
      }

      if (this.world.keyboard.SPACE) {
        //this.triggerBubbleAttack();
        this.jumpin_sound();
      }
      if (this.world.keyboard.DButton) {
        //this.triggerSlapAttack();
        this.attack();
      }

      if (moving && !this.isWalking) {
        this.walking_sound.play();
        this.isWalking = true;
      } else if (!moving && this.isWalking) {
        this.walking_sound.pause();
        this.isWalking = false;
      }
    }, 1000 / 600); // 60 FPS for smooth movement

    setInterval(() => {
      // Handle Animations
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.falling(); // Continue falling logic if needed
      } if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } if (this.isJumping()) {
        this.playAnimation(this.IMAGES_JUMP)
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100); // Animation updates every 100ms
  }

  isJumping() {}

  isAttacking() {
    return this.bubbleAttack;
  }
}
