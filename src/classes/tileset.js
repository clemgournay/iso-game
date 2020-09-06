class Tileset {

    constructor(game, img, width, height, padding) {
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
        this.padding = padding;
        this.tileSize = {
            w: (this.size.px.w / this.size.tile.w),
            h: (this.size.px.h / this.size.tile.h),
        };
        this.tiles = [];
    }

    split() {

        for (let i = 0; i < this.size.tile.w; i++) {
            const row = [];
            for (let j = 0; j < this.size.tile.h; j++) {
                row.push({
                    i: i, j: j,
                    x: (i * this.tileSize.w),
                    y: (j * this.tileSize.h)
                });
            }
            this.tiles.push(row);
        }

        console.log('[TILESET] TILES', this.tiles);
    }


}

export { Tileset };