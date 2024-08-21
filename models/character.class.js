class Character extends MovableObject {
  width = 250;
  height = 250;
  x = 10;
  y = 120;
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
  world;
  swimming_sound = new Audio('audio/swimming.mp3');
  isSwimming = false; 

  currentImage = 0;

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIMMING);

    this.animate();
  }

  animate() {
    setInterval(() => {
    let moving = false;

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x*5) {
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
      if (this.world.keyboard.UP && this.y > -100) {
        this.y -= this.speed;
        moving = true;
      }
      if (this.world.keyboard.DOWN && this.y < 250) {
        this.y += this.speed;
        moving = true;
      }

      if (moving && !this.isSwimming) {
        this.swimming_sound.play();
        this.isSwimming = true;
      } else if (!moving && this.isSwimming) {
        this.swimming_sound.pause();
        this.isSwimming = false;
      }
    }, 1000 / 60); // Am ende auf 60Fps setzen

    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, 100);
  }

  jump() {}
}
