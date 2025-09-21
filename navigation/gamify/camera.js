import { Transform } from "./tools.js";

export class Camera {
    constructor(x, y, dir = 0, zoom = 1, speed = 0.1) {
        this.transform = new Transform(x, y, 0, 0, dir);
        this.target = new Transform(x, y);
        this.speed = speed;
        this.zoom = zoom;
    }

    trig() {
        const c = cos(this.transform.dir);
        const s = sin(this.transform.dir);
        return { s, c };
    }x
}