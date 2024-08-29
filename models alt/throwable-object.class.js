class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.shoot();
    }

    shoot() {        
        this.speedX = 5;
        this.apllyMovement();
    }
}   