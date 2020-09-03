class Tileset {

    constructor(game, img, width, height) {
        this.game = game;
        this.img = img;
        this.size = {
            px: {
                w: this.img.width,
                h: this.img.height
            },
            tile: {
                w: width,
                h: height
            }
        }
        this.tileSize = this.size.px.w / this.size.tile.w;
        this.tiles = [];
    }

    split() {
        

        for (let i = 0; i < this.size.tile.w; i++) {
            const row = [];
            for (let j = 0; j < this.size.tile.h; j++) {
                row.push({
                    i: i, j: j,
                    x: i * this.tileSize, y: j * this.tileSize
                });
            }
            this.tiles.push(row);
        }
    }


}

export { Tileset };