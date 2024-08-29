class Endboss extends MovableObject {
  height = 170;
  width = 300;
  //IMAGES_SWIMMING
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  currentImage = 0;
  animationStarted = false;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 810 * 3; // Starting X position of the Endboss
    this.y = 200;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }


}
