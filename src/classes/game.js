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
        this.character = new Character(this, 7, 7, 'blueCube', 1, 1, 64, 96, ['idle']);
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

                    let collides = false;
                    let l = this.board.groundLayer;
                    /*while (!collides && l < this.board.nbLayers) {
                        if (this.board.grid[l][i][j] && this.board.grid[l][i][j].collides) {
                            collides = true;
                        } else {
                            l++;
                        }
                    }*/
                    if (this.board.grid[l][i][j] && this.board.grid[l][i][j].collides) {
                        collides = true;
                    }

                    if (collides) {
                        row.push(0);
                    } else {
                        row.push(1);
                    }
                    
                }
                grid.push(row);
            }
            console.log(grid)

            const graph = new Graph(grid);
            const start = graph.grid[this.character.block.i][this.character.block.j];
            const end = graph.grid[destinationBlock.i][destinationBlock.j];

            const path = [];
            const result = astar.search(graph, start, end);
            let prevStep = {x: this.character.block.i, y: this.character.block.j};
            result.forEach((step) => {

                let direction = '';
                if (step.x === prevStep.x) {
                    console.log('SAME I')
                    if (prevStep.y < step.y) {
                        direction = 'down-left'
                    } else if (prevStep.y > step.y) {
                        direction = 'up-right';
                    }
                } else if (step.y === prevStep.y) {
                    console.log('SAME J')
                    if (prevStep.x > step.x) {
                        direction = 'up-left';
                    } else if (prevStep.x < step.x) {
                        direction = 'down-right';
                    }
                }

                path.push({
                    direction: direction,
                    i: step.x, j: step.y
                });

                prevStep = step;
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