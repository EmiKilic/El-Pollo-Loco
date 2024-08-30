class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottle;
    coin;
    level_end_x = 700;

    constructor(enemies, clouds, backgroundObjects, bottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
        this.coin = coin;
    }
}