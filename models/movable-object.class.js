class MovableObject {
  x = 120;
  y = 200;
  img;
  height = 150;
  width = 150;
  ImageCache = {};
  otherDirection = false;

  // Assuming you have a global state or game manager
  globalGameState = {
    endbossAnimationStarted: false,
  };

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('Image') <img id="image">
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return this.x + this.width > mo.x && 
        this.y + this.height > mo.y &&
        this.x < mo.x && 
        this.y < mo.y + mo.height;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
