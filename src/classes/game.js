import { Board } from './board.js';
import { Controls } from './controls.js';
import { View } from './view.js';
import { Character } from './character.js';
import { AssetsLoader } from './assets-loader.js';

class Game {

    constructor() {
        this.board = new Board(this, 128, 128, 10, 10, 4, 1);
        this.view = new View(this);
        this.controls = new Controls(this);
        this.loader = new AssetsLoader(this);
        this.character = new Character(this, 5, 2, 'blueCube', 1, 1, 64, 96, ['idle']);
        this.assets = {};
        this.mousePos = {x: 0, y: 0};
        this.hoverBlock = null;
        this.debug = false;
    }

    init() {
        this.board.build();
        this.loader.load({
            images: {
                nature: 'tiles/nature.png',
                galaxy: 'images/galaxy.png',
                blueCube: 'tiles/blue-cube.png'
            }
        }, (assets) => {
            this.assets = assets;
            console.log('[GAME] ASSETS', this.assets);
            this.controls.init();
            this.character.init();
            this.view.init();
            this.run();
        });
    }

    run () {
        this.update();
    }

    update() {
        this.character.update();
        this.view.draw();


        window.requestAnimationFrame(() => {
            this.update();
        });
    }

    updateHoverBlock() {
        this.hoverBlock = this.getBlock(this.mousePos);
    }

    moveCharacterTo(destinationBlock) {
        
        if (destinationBlock) {
            const grid = [];
            for (let i = 0; i < this.board.size.tile.w; i++) {
                const row = [];
                for (let j = 0; j < this.board.size.tile.h; j++) {
                    if (this.board.grid[this.board.groundLayer][i][j] && this.board.grid[this.board.groundLayer][i][j].collides) {
                        row.push(0);
                    } else {
                        row.push(1);
                    }
                }
                grid.push(row);
            }

            const graph = new Graph(grid);
            const start = graph.grid[this.character.block.i][this.character.block.j];
            const end = graph.grid[destinationBlock.i][destinationBlock.j];

            const path = [];
            const result = astar.search(graph, start, end);
            result.forEach((step) => {
                path.push({
                    i: step.x, j: step.y
                });
            })
            this.character.path = path;
            console.log('[GAME] START BLOCK', this.character.block)
            console.log('[GAME] PATH', this.character.path)
        }

    }

    getBlock(point) {

        let foundBlock = null;
        const l = this.board.groundLayer;
        for (let i = 0; i < this.board.size.tile.w; i++) {
            for (let j = 0; j < this.board.size.tile.h; j++) {

                const block = this.board.grid[l][i][j];
                const diamond = [
                    {x: block.x + (this.board.tileSize.w/2), y: block.y},
                    {x: block.x + this.board.tileSize.w, y: block.y + (this.board.tileSize.h/4)},
                    {x: block.x + (this.board.tileSize.w/2), y: block.y + (this.board.tileSize.h/2)},
                    {x: block.x, y: block.y + (this.board.tileSize.h/4)}
                ];
                if (block.tile !== null && PointInsidePolygon(point, diamond)) {
                    foundBlock = block;
                }

            }
        }
        return foundBlock;
    }

    

}

export { Game };