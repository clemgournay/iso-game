class Controls {

    constructor (game) {
        this.game = game;
    }

    init () {
        this.events();
    }

    events() {
        $(document).on('keydown', (e) => {
            if (e.keyCode === 13) {
                this.game.debug = !this.game.debug;
            }
        });

        $(document).on('mousemove', (e) => {
            this.game.mousePos.x = e.pageX - this.game.board.offset.x;
            this.game.mousePos.y = e.pageY - this.game.board.offset.y;
            this.game.updateHoverBlock();
        });

        $(document).on('mousedown', (e) => {
            this.game.moveCharacterTo(this.game.hoverBlock);
        });
    }

}

export { Controls };