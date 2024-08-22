class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 200;
  height = 150;
  width = 150;

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('Image') <img id="image">
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
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
}
