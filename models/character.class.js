class Character extends MovableObject {
  height = 250;
  width = 100;
  y = 0;
  x = 0;
  speed = 10;
  gameLoosePlayed = false;
  lastActionTime = new Date().getTime();
  idleTimeLimit = 10000;
  isWalking = false;
  world;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

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

  playSound() {
    if (!this.gameLoosePlayed) {
      soundEffects.loose.play();
      this.gameLoosePlayed = true;
      gameStarted = false;
    }
  }

  animate() {
    setInterval(() => {
      let moving = false;
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x * 4
      )
        this.moveRight(), (moving = true);
      if (this.world.keyboard.LEFT && this.x > 0)
        this.moveLeft(), (moving = true), (this.otherDirection = true);
      if (this.world.keyboard.UP && !this.isAboveGround())
        this.jump(), soundEffects.jumpUp.play();
      this.world.camera_x = -this.x + 100;
      if (moving !== this.isWalking)
        moving ? soundEffects.walking.play() : soundEffects.walking.pause(),
          (this.isWalking = moving);
      if (moving) this.lastActionTime = new Date().getTime();
    }, 1000 / 60);

    setInterval(() => {
      const idleDuration = new Date().getTime() - this.lastActionTime;
      if (this.isDead())
        this.playAnimation(this.IMAGES_DEAD), this.fall(), this.playSound();
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
      else if (idleDuration > this.idleTimeLimit)
        this.playAnimation(this.IMAGE_WAITING), soundEffects.sleep.play();
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
        this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}
