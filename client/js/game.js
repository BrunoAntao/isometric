window.addEventListener('load', function () {

    var app = new PIXI.Application(window.innerWidth, window.innerHeight, { antialias: true });
    document.body.appendChild(app.view);

    global.app = app;

    app.renderer.backgroundColor = 0x212121;

    let tiles = new PIXI.DisplayObjectContainer();
    app.stage.addChild(tiles);
    global.tiles = tiles;

    for (let x = 0; x < 10; x++) {

        for (let y = 0; y < 10; y++) {

            tiles.addChild(new Grid(app, x, y, 0));

        }

    }

    app.ticker.add(function () {

        tiles.children.sort(function (a, b) {

            return b.pos.y - a.pos.y + a.pos.x - b.pos.x + a.pos.z - b.pos.z;

        })

        tiles.children.forEach(function (tile) {

            tile.draw();

        });

    });

    window.addEventListener('resize', function () {

        app.renderer.resize(window.innerWidth, window.innerHeight);

    })

})