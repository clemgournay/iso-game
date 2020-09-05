import { Tileset } from './tileset.js';

class View {

    constructor(game) {
        this.game = game;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tileset = null;
    }

    init () {
        this.tileset = new Tileset(this.game, this.game.assets.images.grass, 6, 5);
        this.tileset.split();
        
        document.body.appendChild(this.canvas);
        this.resize();
        this.draw();
        window.onresize = () => {
            this.resize();
        }
    }

    draw() {
        this.ctx.fillStyle = 'Black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard();
    }

    drawBoard() {
        for (let l = 0; l < this.game.board.nbLayers - 3; l++) {
            for (let i = 0; i < this.game.board.size.tile.w; i++) {
                for (let j = 0; j < this.game.board.size.tile.h; j++) {
                    const asset = this.game.assets.images['grass'];
                    const block = this.game.board.grid[l][i][j];
                    const tile = this.tileset.tiles[0][3];
                    this.ctx.drawImage(
                        asset, 
                        tile.x, tile.y, this.tileset.tileSize, this.tileset.tileSize,
                        this.game.board.offset.x + block.x, this.game.board.offset.y + block.y, this.game.board.tileSize, this.game.board.tileSize
                    );
                }
            }
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.game.board.resize();
        this.draw();
    }

}

export { View };