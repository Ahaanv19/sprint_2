
import { keys } from "./input.js";
// import { socket } from "./socket.js";
import { Transform } from "./tools.js";
import { Sprite } from "./sprite.js";
import { boxCollide } from "./hitbox.js"

export class PlayerController {
    constructor(startX, startY, roomID = 0) {
        this.transform = new Transform(startX, startY);
        // this.socket = roomID;
        this.speed = 0.1;
        // this.initSocketEvents();
        this.walk = new Sprite("./art/mushroom-player.png", 6, 10);
        this.stand = new Sprite("./art/mushroom-player.png", 1, 10);
    }

    // initSocketEvents() {
    //     this.socket.on("movePlayer", (data) => {
    //         this.transform.position.x = data.x;
    //         this.transform.position.y = data.y;
    //         camera.update(this.player);
    //     });

    //     this.socket.on("disconnect", () => {
    //         console.log("Disconnected from server");
    //     });
    // }

    moveVel(speed) {
        const rad = (this.transform.direction * Math.PI) / 180;
        this.transform.velocity.xv += speed * Math.cos(rad);
        this.transform.velocity.yv += speed * Math.sin(rad);
    }

    move(xv,yv) {
        this.transform.position.x += xv * Math.cos(rad);
        this.transform.position.y += yv * Math.cos(rad);
        if (boxCollide(this.transform.position)) {
            this.transform.position.x += -xv * Math.cos(rad);
            this.transform.position.y += -yv * Math.cos(rad);
        }
    }

    controls(speed) {
        if (keys.w) {
            this.transform.direction.dir = 0;
            this.moveVel(speed);
        } else if (keys.s) {
            this.transform.direction.dir = 180;
            this.moveVel(speed);
        } else if (keys.a) {
            this.transform.direction.dir = 270;
            this.moveVel(speed);
        } else if (keys.d) {
            this.transform.direction.dir = 90;
            this.moveVel(speed);
        }
    }

    update(deltaTime) {
        this.controls(this.speed);

        this.transform.velocity.xv *= 0.9;
        this.transform.velocity.yv *= 0.9;

        this.move(this.transform.velocity.xv * deltaTime, 0);
        this.move(0, this.transform.velocity.yv * deltaTime);
        // this.socket.emit("movePlayer", {
        //     x: this.transform.position.x,
        //     y: this.transform.position.y,
        //     dir: this.transform.direction.dir,
        // });
    }

    draw(ctx, frame, camera, canvas) {
        const pos = {
            x: this.transform.position.x,
            y: this.transform.position.y,
        }

        const d = this.transform.distance(0,0,this.transform.velocity.xv,this.transform.velocity.yv);
        if (d <= 1e-3) {
            this.stand.draw(ctx, frame, 0, pos.x, pos.y, 1, canvas);
        } else {
            this.walk.draw(ctx, 1, 0, pos.x, pos.y, 1, canvas);
        }
    }
}