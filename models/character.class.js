  class Character extends MovableObject {
    width = 150;
    height = 80;
    x = 0;
    y = 220;
    speed = 4;
 
    IMAGES_SWIMMING = [
      "img/1.Sharkie/1.IDLE/1.png",
      "img/1.Sharkie/1.IDLE/2.png",
      "img/1.Sharkie/1.IDLE/3.png",
      "img/1.Sharkie/1.IDLE/4.png",
      "img/1.Sharkie/1.IDLE/5.png",
      "img/1.Sharkie/1.IDLE/6.png",
      "img/1.Sharkie/1.IDLE/7.png",
      "img/1.Sharkie/1.IDLE/8.png",
      "img/1.Sharkie/1.IDLE/9.png",
      "img/1.Sharkie/1.IDLE/10.png",
      "img/1.Sharkie/1.IDLE/11.png",
      "img/1.Sharkie/1.IDLE/12.png",
      "img/1.Sharkie/1.IDLE/13.png",
      "img/1.Sharkie/1.IDLE/14.png",
      "img/1.Sharkie/1.IDLE/15.png",
      "img/1.Sharkie/1.IDLE/16.png",
      "img/1.Sharkie/1.IDLE/17.png",
      "img/1.Sharkie/1.IDLE/18.png",
    ];
  
    IMAGES_DEAD = [
      "img/1.Sharkie/6.dead/2.Electro_shock/1.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/2.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/3.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/4.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/5.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/6.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/7.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/8.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/9.png",
      "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
    ];
  
    IMAGES_HURT = [
      "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
    ];
  
    IMAGES_BUBBLE_ATTACK = [
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
    ];
  
    IMAGES_FINSLAP_ATTACK = [
      "img/1.Sharkie/4.Attack/FinSlap/1.png",
      "img/1.Sharkie/4.Attack/FinSlap/2.png",
      "img/1.Sharkie/4.Attack/FinSlap/3.png",
      "img/1.Sharkie/4.Attack/FinSlap/4.png",
      "img/1.Sharkie/4.Attack/FinSlap/5.png",
      "img/1.Sharkie/4.Attack/FinSlap/6.png",
      "img/1.Sharkie/4.Attack/FinSlap/7.png",
      "img/1.Sharkie/4.Attack/FinSlap/8.png",
    ];

    world;
    swimming_sound = new Audio("audio/swimming.mp3");
    bubbleAttack_sound = new Audio("audio/bubble.mp3");
    slapAttack_sound = new Audio("audio/slap.mp3");
    isSwimming = false;
    bubbleAttack = false;
    slapAttack = false;
  
    currentImage = 0;
  
    constructor() {
      super().loadImage("img/1.Sharkie/1.IDLE/1.png");
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_BUBBLE_ATTACK);
      this.loadImages(this.IMAGES_FINSLAP_ATTACK);
  
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        let moving = false;
  
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 4) {
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
          this.triggerBubbleAttack();
        }
        if (this.world.keyboard.DButton) {
          this.triggerSlapAttack();
        }


        if (moving && !this.isSwimming) {
          this.swimming_sound.play();
          this.isSwimming = true;
        } else if (!moving && this.isSwimming) {
          this.swimming_sound.pause();
          this.isSwimming = false;
        }
      }, 1000 / 60); // Set to 60 FPS
  
      setInterval(() => {
        // Handle Animations
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isSlap()) {
          this.playAnimation(this.IMAGES_FINSLAP_ATTACK);
        } else if (this.isBubble()) {
          this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
        } else {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }, 100); // Animation updates every 100ms
    }
  
    triggerBubbleAttack() {
      if (!this.bubbleAttack) {
        this.bubbleAttack = true;
        this.bubbleAttack_sound.play();
        this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
  
        setTimeout(() => {
          this.bubbleAttack = false;
          this.bubbleAttack_sound.pause();
          this.bubbleAttack_sound.currentTime = 0;
          this.playAnimation(this.IMAGES_SWIMMING);
        }, 700); // Play animation for 2 seconds
      }
    }
  
    triggerSlapAttack() {
      if (!this.slapAttack) {
        this.slapAttack = true;
        this.slapAttack_sound.play();
        this.playAnimation(this.IMAGES_FINSLAP_ATTACK);
  
        setTimeout(() => {
          this.slapAttack = false;
          this.slapAttack_sound.pause();
          this.slapAttack_sound.currentTime = 0;
          this.playAnimation(this.IMAGES_SWIMMING);
        }, 700); // Play animation for 2 seconds
      }
    }
  
    isSlap() {
      return this.slapAttack;
    }
  
    isBubble() {
      return this.bubbleAttack;
    }
  }
  
