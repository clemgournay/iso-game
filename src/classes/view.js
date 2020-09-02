import { Board } from './board.js';

class View {

    constructor(game) {
        this.game = game;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.board = new Board(game, 64, 10, 10);
    }

    init () {
        document.body.appendChild(this.canvas);
        this.resize();
        this.board.build();
        this.draw();
        window.onresize = () => {
            this.resize();
        }
    }

    draw() {
        this.ctx.fillStyle = 'Black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw();
    }

}

export { View };