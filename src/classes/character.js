class Character {
    
    constructor(game, startI, startJ, assetID, charsetW, charsetH, centerX, centerY, order) {
        this.game = game;
        this.startPos = {
            i: startI, j: startJ
        };
        this.block = null;
        this.x = 0;
        this.y = 0;
        this.assetID = assetID;
        this.img = null;
        this.charsetSize = {
            px: {
                w: 0, h: 0
            },
            tile: {
                w: charsetW, h: charsetH
            }
        };
        this.center = {
            x: centerX, y: centerY
        };
        this.centerY = centerY;
        this.order = order;
        this.width = 0;
        this.height = 0;
        this.sprites = {
            idle: [],
            walk: []
        };
        this.frame = 0;
        this.anim = 'idle';
        this.path = [];
        this.step = 0;
        this.speed = 2;
    }

    init() {
        this.img =  this.game.assets.images[this.assetID];
        this.charsetSize.px.w = this.img.width;
        this.charsetSize.px.h = this.img.height;
        this.width = (this.charsetSize.px.w / this.charsetSize.tile.w);
        this.height = (this.charsetSize.px.h / this.charsetSize.tile.h);
        this.block = this.game.board.grid[this.game.board.groundLayer][this.startPos.i][this.startPos.j];
        this.x = this.block.x + this.center.x;
        this.y = this.block.y - (this.height/2) + this.center.y;

        for (let j = 0; j < this.charsetSize.tile.h; j++) {
            const row = [];
            const anim = this.order[j];
            for (let i = 0; i < this.charsetSize.tile.w; i++) {
                row.push({
                    i: i, j: j,
                    x: (i * this.width),
                    y: (j * this.height)
                });
            }
            this.sprites[anim].push(row);
        }

        console.log('[CHARSET] SPRITE', this.sprites);
    } 

    update() {
        if (this.path.length > 0) {
            
            const step = this.path[this.step];
            const endBlock = this.game.board.grid[this.game.board.groundLayer][step.i][step.j];

            const endPos = {
                x: endBlock.x + this.game.board.tileSize.w/2,
                y: endBlock.y + this.game.board.tileSize.h/4
            };

            //console.log(this.step, step);
            switch (step.direction) {
                case 'down-right':
                    console.log('[CHARACTER] Go down right')
                    this.x += this.speed;
                    this.y += this.speed * 0.5;
                    this.block = this.game.getBlock({x: this.x, y: this.y});
                    break;
                case 'up-left':
                    console.log('[CHARACTER] Go up left')
                    this.x -= this.speed;
                    this.y -= this.speed * 0.5;
                    this.block = this.game.getBlock({x: this.x, y: this.y});
                    break;
                case 'down-left':
                    console.log('[CHARACTER] Go down left')
                    this.x -= this.speed;
                    this.y += this.speed * 0.5;
                    this.block = this.game.getBlock({x: this.x, y: this.y});
                    break;
                case 'up-right':
                    console.log('[CHARACTER] Go up right')
                    this.x += this.speed;
                    this.y -= this.speed * 0.5;
                    this.block = this.game.getBlock({x: this.x, y: this.y});
                    break;
            }

            if (this.x === endPos.x && this.y === endPos.y) {
                this.step++;
                if (this.step === this.path.length) {
                    this.path = [];
                    this.step = 0;
                    console.log('OWARI')
                }
                
            }
            

            
        }
    }


}

export { Character };