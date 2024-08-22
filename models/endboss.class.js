class Endboss extends MovableObject {
  height = 170;
  width = 300;
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
    this.x = 810 * 3; // Starting X position of the Endboss
    this.y = 200;
    this.animate();
  }

  animate() {
    this.moveLeft();

    const screenAreaX = 2380; // Set your desired X coordinate where animation starts

    const checkPosition = setInterval(() => {
      // Check if the Endboss object hits the specific X coordinate (e.g., X >= 2000)
      if (this.x <= screenAreaX && !this.animationStarted) {
        this.playAnimationOnce(this.IMAGES_SWIMMING);
        this.animationStarted = true;
        clearInterval(checkPosition); // Stop checking after the animation starts
      }
    }, 100); // Adjust the interval for smoother checking
  }

  playAnimationOnce(images) {
    let imageIndex = 0;
    const animationInterval = setInterval(() => {
      if (imageIndex < images.length) {
        this.playAnimation(images);
        imageIndex++;
      } else {
        clearInterval(animationInterval); // Stop animation after one complete cycle
      }
    }, 1000 / 60); // Adjust the interval timing as per your requirements
  }
}
