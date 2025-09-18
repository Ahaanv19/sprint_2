
export class Transform {
    constructor(x = 0, y = 0, xv = 0, yv = 0, dir = 0) {
        this.position = {x: x, y: y};
        this.velocity = {xv: 0, yv: 0};
        this.direction = dir;
    }
}