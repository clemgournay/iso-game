class Board {

    constructor(game, tileSize, width, height) {
        this.game = game;
        this.nbLayers = 4;
        this.tileSize = tileSize;
        this.size = {
            px: {
                w: 0,
                h: 0
            },
            tile: {
                w: width,
                h: height
            }
        };
        this.grid = [];
    }

    build() {

        this.size.px.w = this.size.tile.w * this.tileSize;
        this.size.px.h = this.size.tile.h * this.tileSize;
        for (let l = 0; l < this.nbLayers; l++) {
            this.grid.push([]);
        }

        const incX = this.tileSize;
        const incY = this.tileSize/4;

        for (let l = this.nbLayers - 1; l >= 0; l--) {

            const startX = (this.game.view.canvas.width/2) - (this.size.px.w / 2);
            const startY = (l * incY);

            let x = startX;
            let y = startY;
            
            for (let i = 0; i < this.size.tile.w; i++) {
                const row = [];
                for (let j = 0; j < this.size.tile.h; j++) {
                    console.log(i, j)
                    row.push({
                        i: i, j: i,
                        x: x, y: y
                    });
                }
                x += incX;
                y += incY;
                this.grid[l].push(row);
            }
        }
        console.log(this.grid)
    }

}

export { Board };