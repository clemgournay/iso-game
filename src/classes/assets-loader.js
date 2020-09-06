class AssetsLoader {

    constructor(game, assetsToLoad) {
        this.game = game;
        this.nbAssets = 0;
        this.loadedAssets = 0;
    }

    countAssets() {
        this.nbAssets = 0;
        for (let type in this.assetsToLoad) {
            for (let id in this.assetsToLoad[type]) {
                this.nbAssets++;
            }
        }
    }

    load(assetsToLoad, complete) {
        const assets = {};
        this.assetsToLoad = assetsToLoad;
        this.countAssets();

        for (let type in this.assetsToLoad) {
            assets[type] = {};
            for (let id in this.assetsToLoad[type]) {
                if (type === 'images') {
                    const img = new Image();
                    img.src = './assets/' + this.assetsToLoad[type][id];
                    img.type = type;
                    img.id = id;
                    const self = this;
                    img.onload = function() {
                        assets[this.type][this.id] = this;
                        self.loadedAssets++;
                        if (self.loadedAssets === self.nbAssets) {
                            complete(assets);
                        }
                    }
                }
            }
        }

    }

}

export { AssetsLoader };