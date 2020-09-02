class Tileset {

    constructor(game, img, tileSize) {
        this.game = game;
        this.img = img;
        this.tileSize = tileSize;
        this.size = {
            px: {
                w: this.img.width,
                h: this.img.height
            },
            tile: {
                w: 0,
                h: 0
            }
        }
        this.tiles = {};
    }

    split() {
        this.size.tile.w = this.size.px.w / this.tileSize;
        this.size.tile.h = this.size.px.h / this.tileSize;
    }


}

export { Tileset };