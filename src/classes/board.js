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
        this.offset = {
            x: 0, y: 0
        }
    }

    build() {

        this.size.px.w = this.size.tile.w * this.tileSize;
        this.size.px.h = this.size.tile.h * this.tileSize;

        this.resize();

        const incLayer = this.tileSize/2;

        for (let l = 0; l < this.nbLayers; l++) {
            this.grid.push([]);
        }

        for (let l = this.nbLayers - 1; l >= 0; l--) {

            const startX = (this.size.px.w / 2) - (this.tileSize/2);
            const startY = (this.nbLayers * (this.tileSize/2)) + this.nbLayers * incLayer;
            const incX = this.tileSize/4;
            const incY = this.tileSize/8;

            for (let i = 0; i < this.size.tile.w; i++) {
                const col = [];

                let x = startX + (i * incX);
                let y = startY - (l * incLayer) + (i * incY);
                
                for (let j = 0; j < this.size.tile.h; j++) {
                    
                    col.push({
                        x: x, y: y,
                        i: i, j: j,
                        tile: 'EMPTY',
                        collides: false,
                        forground: false
                    });

                    x -= incX;
                    y += incY;
                }
                this.grid[l].push(col);
            }
            
        }

        for (let i = 1; i < this.size.tile.w; i++) {
            for (let j = 1; j < this.size.tile.h; j++) {
                this.grid[0][i][j].tile = 'FLOOR';
            }
        }

        console.log(this.grid)

    }

    resize() {
        this.offset.x = (window.innerWidth/2) - (this.size.px.w/2);
        this.offset.y = (window.innerHeight/2) - (this.size.px.h/2);

        console.log(this.offset)
    }


}

export { Board };