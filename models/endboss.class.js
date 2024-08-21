class Endboss extends MovableObject {
  height = 500;
  width = 500;
  IMAGES_SWIMMING = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  currentImage = 0;
  animationStarted = false;

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.x = 820 *3;
    this.y = 0;
    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      if (this.x >= 2450 && !this.animationStarted) {
        this.animationStarted = true;
        this.playAnimationOnce(this.IMAGES_SWIMMING);
      }
    }, 80);
  }

  playAnimationOnce(images) {
    let animationIndex = 0;
    
    const interval = setInterval(() => {
      if (animationIndex >= images.length) {
        clearInterval(interval); 
      } else {
        let path = images[animationIndex];
        this.img = this.ImageCache[path]; 
        animationIndex++;                  
      }
    }, 100);
  }
  
}
