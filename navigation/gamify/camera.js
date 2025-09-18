import { Transform } from "./tools.js";

export class Camera {
    constructor(x, y, speed = 0.1) {
        this.transform = new Transform(x, y);
        this.target = new Transform(x, y);
        this.speed = this.speed;
    }
}