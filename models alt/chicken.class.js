class Chicken extends MovableObject {
  height = 50;
  width = 50;
  //IMAGES_SWIMMING 
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DIE = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];
  currentImage = 0;
  hit = false;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DIE);

    this.x = 400 + Math.random() * 500 * 4;
    this.y = 0 + Math.random() * 300;
    this.animate();
  }

  animate() {


    setInterval(() => {
      if (this.didDie()) {
        this.playAnimation(this.IMAGES_DIE);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
      }
    }, 1000 / 4);
  }

  didDie() {
    return this.hit = false;
  }
}
