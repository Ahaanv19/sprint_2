import { Sprite } from "./sprite.js";
import { Transform } from "./tools.js";
import { fetchMousePos } from "./mouse.js";

export class Selector {
    constructor(x, y){
        this.transform = new Transform(x, y);
    }

    updPos(xpos, ypos) {
        this.transform.position = {x: xpos, y: ypos};
    }

    quad(x, y, size) {
        var points = [];
        points.push(this.goTo3(x - size, y + size));
        points.push(this.goTo3(x - size, y - size));
        points.push(this.goTo3(x + size, y - size));
        points.push(this.goTo3(x + size, y + size));

        return points;
    }

    findInverse(camera) {
        const mouse = fetchMousePos();
        var x1 = mouse.x / camera.zoom;
        var y1 = mouse.y * 2 / camera.zoom;
        const rotz = x1 * -c + z1 * -s;
        const rotx = x1 * -s + z1 * -c;
        x1 = Math.floor((rotx + camera.transform.position.x)/32)*32;
        y1 = Math.floor((roty + camera.transform.position.y)/32)*32;
        return {x: x1, y: y1};
    }

    draw(ctx, camera, player){
        const mouse = findInverse(camera);
        const points = this.quad(mouse.x, mouse.y, 12);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = "#ffffffd8";
        ctx.stroke();
    }
}