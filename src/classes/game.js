import { Board } from './board.js';
import { View } from './view.js';
import { AssetsLoader } from './assets-loader.js';

class Game {

    constructor() {
        this.board = new Board(this, 128, 10, 10);
        this.view = new View(this);
        this.loader = new AssetsLoader(this);
        this.assets = {};
    }

    init() {
        this.board.build();
        this.loader.load({
            images: {
                grass: 'tiles/grass-spritesheet.png'
            }
        }, (assets) => {
            this.assets = assets;
            console.log(this.assets)
            this.view.init();
        });
    }

}

export { Game };