import { Tileset } from './tileset.js';

class View {

    constructor(game) {
        this.game = game;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tileset = null;
    }

    init () {
        this.tileset = new Tileset(this.game, this.game.assets.images.nature, 6, 6, 0);
        this.tileset.split();
        
        document.body.appendChild(this.canvas);
        this.resize();
        this.draw();
        window.onresize = () => {
            this.resize();
        }
    }

    draw() {
        this.drawBackground();
        this.drawBoard();
        this.drawCharacter();
        if (this.game.debug) {
            this.drawHelpers();
        }
    }
    
    drawBackground() {
                /*const bg = this.game.assets.images['galaxy'];
        this.ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, this.canvas.width, this.canvas.height);*/
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'lightblue');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard() {
        for (let l = 0; l < this.game.board.nbLayers; l++) {
            for (let i = 0; i < this.game.board.size.tile.w; i++) {
                for (let j = 0; j < this.game.board.size.tile.h; j++) {
                    const asset = this.tileset.img;
                    const block = this.game.board.grid[l][i][j];
                    
                    if (block.tile) {
                        const tile = this.tileset.tiles[block.tile.i][block.tile.j];
                        this.ctx.drawImage(
                            asset, 
                            tile.x, tile.y, 
                            this.tileset.tileSize.w, 
                            this.tileset.tileSize.h,
                            this.game.board.offset.x + block.x - this.tileset.padding, 
                            this.game.board.offset.y + block.y - this.tileset.padding, 
                            this.game.board.tileSize.w + this.tileset.padding,
                            this.game.board.tileSize.h + this.tileset.padding
                        );
                    }
                }
            }
        }
    }

    drawCharacter() {
        const character = this.game.character;
        const sprite = character.sprites[character.anim][character.frame][0];
        this.ctx.drawImage(
            character.img, 
            sprite.x, sprite.y, 
            character.width, character.height,
            (this.game.board.offset.x + character.x) - character.center.x,  
            (this.game.board.offset.y + character.y) - character.center.y, 
            character.width, character.height
        );
    }

    drawHelpers() {

        this.ctx.fillStyle = 'red';
        this.ctx.font = '20px consolas';
        this.ctx.textAlign = 'center';
        this.ctx.strokeRect(this.game.board.offset.x, this.game.board.offset.y, this.game.board.size.px.w, this.game.board.size.px.h);

        for (let i = 0; i < this.game.board.size.tile.w; i++) {
            for (let j = 0; j < this.game.board.size.tile.h; j++) {
                const block = this.game.board.grid[this.game.board.groundLayer][i][j];
                this.ctx.strokeStyle = 'red';
                this.ctx.strokeRect(
                    this.game.board.offset.x + block.x, 
                    this.game.board.offset.y + block.y, 
                    this.game.board.tileSize.w, this.game.board.tileSize.h
                );
                
                this.ctx.fillText(i+'-'+j, this.game.board.offset.x + block.x + (this.game.board.tileSize.w / 2), this.game.board.offset.y + block.y + 20)
            }
        }

        const block = this.game.character.block;
        this.ctx.fillStyle = 'blue';
        this.ctx.globalAlpha = 0.1;
        this.ctx.fillRect(
            this.game.board.offset.x + block.x, this.game.board.offset.y + block.y, 
            this.game.board.tileSize.w, this.game.board.tileSize.h
        );
        this.ctx.globalAlpha = 1;

        this.ctx.fillStyle = 'blue';
        const character = this.game.character;
        this.ctx.fillRect(
            (this.game.board.offset.x + character.x),  
            (this.game.board.offset.y + character.y), 4, 4);
            if (this.game.character.path.length > 0) {
                
                this.ctx.fillStyle = 'yellow';
                const step = character.path[character.step];
                const endBlock = this.game.board.grid[this.game.board.groundLayer][step.i][step.j];
                console.log(endBlock)

                const endPos = {
                    x: this.game.board.offset.x + endBlock.x + this.game.board.tileSize.w/2,
                    y: this.game.board.offset.y + endBlock.y + this.game.board.tileSize.h/4,
                };
                this.ctx.fillRect(endPos.x, endPos.y, 4, 4);
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