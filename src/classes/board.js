class Board {

    constructor(game, tileW, tileH, width, height, nbLayers, groundLayer) {
        this.game = game;
        this.nbLayers = nbLayers;
        this.tileSize = {
            w: tileW,
            h: tileH
        };
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
        };
        this.groundLayer = groundLayer;
    }

    build() {

        this.size.px.w = this.size.tile.w * this.tileSize.w;
        this.size.px.h = this.nbLayers * (this.tileSize.h * 2);

        this.resize();

        const incLayer = this.tileSize.h/2;

        for (let l = 0; l < this.nbLayers; l++) {
            this.grid.push([]);
        }

        for (let l = this.nbLayers - 1; l >= 0; l--) {

            const startX = (this.size.px.w / 2) - (this.tileSize.w/2);
            const startY = (this.nbLayers * incLayer);
            const incX = this.tileSize.w/2;
            const incY = this.tileSize.h/4;

            for (let i = 0; i < this.size.tile.w; i++) {
                const col = [];

                let x = startX + (i * incX);
                let y = startY - (l * incLayer) + (i * incY);
                
                for (let j = 0; j < this.size.tile.h; j++) {
                    
                    col.push({
                        x: x, y: y,
                        i: i, j: j,
                        tile: null,
                        collides: false,
                        forground: false
                    });

                    x -= incX;
                    y += incY;
                }
                this.grid[l].push(col);
            }
            
        }

        for (let i = 0; i < this.size.tile.w; i++) {
            for (let j = 0; j < this.size.tile.h; j++) {
                this.grid[1][i][j].tile = {i: 0, j: 0};
            }
        }

        for (let i = 0; i < this.size.tile.w; i++) {
            for (let j = 0; j < this.size.tile.h; j++) {
                this.grid[0][i][j].tile = {i: 0, j: 1};
            }
        }

        this.grid[1][2][2].tile = {i: 1, j: 0};
        this.grid[1][5][4].tile = {i: 1, j: 0};
        this.grid[1][8].tile = {i: 1, j: 0};

        this.grid[0][3][3].tile = null;
        this.grid[0][3][4].tile = null;
        this.grid[0][4][4].tile = null;
        this.grid[0][4][3].tile = null;
        this.grid[0][4][4].tile = null;
        this.grid[0][4][5].tile = null;
        this.grid[0][5][5].tile = null;
        this.grid[0][5][4].tile = null;
        this.grid[0][5][3].tile = null;
        
        this.grid[1][2][3].tile = {i: 0, j: 1};
        this.grid[1][2][4].tile = {i: 0, j: 1};
        this.grid[1][2][5].tile = {i: 0, j: 1};

        this.grid[1][3][3].tile = null;
        this.grid[1][3][4].tile = null;
        this.grid[1][4][4].tile = null;
        this.grid[1][4][3].tile = null;
        this.grid[1][3][5].tile = null;
        this.grid[1][4][5].tile = null;
        this.grid[1][5][5].tile = null;
        this.grid[1][5][4].tile = null;
        this.grid[1][5][3].tile = null;

        this.grid[1][8][8].tile = {i: 1, j: 0};

        this.grid[1][3][3].collides = true;
        this.grid[1][4][3].collides = true;
        this.grid[1][5][3].collides = true;
        this.grid[1][3][4].collides = true;
        this.grid[1][3][5].collides = true;
        this.grid[1][4][4].collides = true;
        this.grid[1][4][5].collides = true;
        this.grid[1][5][4].collides = true;
        this.grid[1][5][5].collides = true;

        this.grid[2][2][0].tile = {i: 0, j: 0};
        this.grid[2][2][0].collides = true;
        this.grid[2][2][1].tile = {i: 0, j: 0};
        this.grid[2][2][1].collides = true;
        this.grid[2][2][2].tile = {i: 0, j: 0};
        this.grid[2][2][2].collides = true;
        this.grid[2][2][3].tile = {i: 0, j: 0};
        this.grid[2][2][3].collides = true;
        this.grid[2][2][4].tile = {i: 0, j: 0};
        this.grid[2][2][4].collides = true;
        this.grid[2][2][5].tile = {i: 0, j: 0};
        this.grid[2][2][5].collides = true;


        this.grid[1][4][1].tile = {i: 2, j: 1};
        this.grid[1][4][1].collides = true;
        this.grid[2][3][0].tile = {i: 2, j: 0};

        this.grid[1][8][1].tile = {i: 2, j: 1};
        this.grid[1][8][1].collides = true;
        this.grid[2][7][0].tile = {i: 2, j: 0};


        console.log('[BOARD] GRID', this.grid)

    }


    resize() {
        this.offset.x = Math.floor((window.innerWidth/2) - (this.size.px.w/2));
        this.offset.y = Math.floor((window.innerHeight/2) - (this.size.px.h/2));
    }


}

export { Board };