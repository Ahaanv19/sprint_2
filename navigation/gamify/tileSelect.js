import { Sprite } from "./sprite.js";
import { Transform } from "./tools.js";

export class Selector {
    constructor(x, y){
        this.img = new Sprite("./art/select.png", 1, 1);
        this.transform = new Transform(x, y);
    }

    draw(ctx, frame, camera, canvas){
        const c = camera.transform.position;
        const pos = {
            x: Math.floor((this.transform.position.x - c.x) * 64) / 64 + c.x,
            y: Math.floor((this.transform.position.y - c.y) * 64) / 64 + c.y
        }
        this.img.draw(ctx, frame, 0, pos.x, pos.y, 1, canvas);
    }
}