class IsoPoly extends PIXI.DisplayObjectContainer {

    constructor(app, x, y, z, faces) {

        super();

        this.pos = { x: x, y: y, z: z };
        this.faces = faces;

        app.stage.addChild(this);

        this.faces.forEach(function (face) {

            face.points.forEach(function (point) {

                point.x += this.pos.x;
                point.y += this.pos.y;
                point.z += this.pos.z;

                point.update();

            }, this)

            this.addChild(face);

        }, this)

    }

    sort() {

        this.children.forEach(function (face) {

            face.sum = { x: 0, y: 0, z: 0 };

            face.points.forEach(function (point) {

                face.sum.x += point.x / face.points.length;
                face.sum.y += point.y / face.points.length;
                face.sum.z += point.z / face.points.length;

            })

        })

        this.children.sort(function (a, b) {

            return b.sum.y - a.sum.y + a.sum.x - b.sum.x + a.sum.z - b.sum.z;

        })

    }

    draw() {

        this.sort();

        this.faces.forEach(function (face) {

            face.draw();

        })

    }

}

class IsoFace extends PIXI.Graphics {

    constructor(points) {

        super();

        this.points = points;
        this.color = 0x000000;
        this.overColor = 0xffffff;
        this.outColor = 0x000000;

        this.interactive = true;

        this.on('pointerdown', function (face) {

            console.log('s');

        });

        this.on('pointerover', function (face) {

            this.color = this.overColor;

        });

        this.on('pointerout', function (face) {

            this.color = this.outColor;

        });
    }

    draw() {

        this.clear();

        this.beginFill(this.color);
        this.lineStyle(1, 0xffffff, 1);

        this.moveTo(this.points[0].tx, this.points[0].ty);

        this.points.forEach(function (point, i) {

            if (i > 0) {

                this.lineTo(point.tx, point.ty);

            }

        }, this);

        this.lineTo(this.points[0].tx, this.points[0].ty);

        this.endFill();

    }

}

class IsoPoint {

    constructor(x, y, z) {

        this.x = x;
        this.y = y;
        this.z = z;

        this.prespective = 1;

        this.tx = 300 / 4 + this.x * 32 + this.y * 32;
        this.ty = 800 / 4 + this.x * 16 * this.prespective - this.y * 16 * this.prespective - this.z * 32;

    }

    update() {

        this.tx = 300 / 4 + this.x * 32 + this.y * 32;
        this.ty = 800 / 4 + this.x * 16 * this.prespective - this.y * 16 * this.prespective - this.z * 32;

    }

}