
export class Transform {
    constructor(x = 0, y = 0, xv = 0, yv = 0, dir = 0) {
        this.position = {x: x, y: y};
        this.velocity = {xv: xv, yv: yv};
        this.direction = dir;
    }

    goTo(x1, y1) {
        this.position = {x: x1, y: y1};
    }

    goTo3(x1, z1, camera) {
        const { s, c } = camera.trig();
        const rotz = z1 * -c - x1 * -s;
        const rotx = z1 * -s + x1 * -c;
        return {x: rotx * camera.zoom, y: rotz * 0.5 * camera.zoom};
    }

    distance(x1,y1,x2,y2) {
        const dx = x2-x1;
        const dy = y2-y1;
        return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    }
}