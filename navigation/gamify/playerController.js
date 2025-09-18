
import { keys } from "./input.js";
// import { socket } from "./socket.js";
import { Transform } from "./tools.js";
import { Sprite } from "./sprite.js";

export class PlayerController {
    constructor(startX, startY, roomID = 0) {
        this.transform = new Transform(startX, startY);
        this.socket = roomID;
        this.speed = 0.1;
        this.initSocketEvents();
        this.img = new Sprite("./art/mushroom-player.png", 6, 10);
    }

    initSocketEvents() {
        this.socket.on("movePlayer", (data) => {
            this.transform.position.x = data.x;
            this.transform.position.y = data.y;
            camera.update(this.player);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    }

    move(speed) {
        const rad = (this.transform.direction.dir * Math.PI) / 180;
        this.transform.velocity.xv += speed * Math.cos(rad);
        this.transform.velocity.yv += speed * Math.sin(rad);
    }

    controls(speed) {
        if (keys.w) {
            this.transform.direction.dir = 0;
            this.move(speed);
        } else if (keys.s) {
            this.transform.direction.dir = 180;
            this.move(speed);
        } else if (keys.a) {
            this.transform.direction.dir = 270;
            this.move(speed);
        } else if (keys.d) {
            this.transform.direction.dir = 90;
            this.move(speed);
        }
    }

    update(deltaTime) {
        this.controls(this.speed);

        this.transform.velocity.xv *= 0.9;
        this.transform.velocity.yv *= 0.9;

        this.transform.position.x += this.transform.velocity.xv * deltaTime;
        this.transform.position.y += this.transform.velocity.yv * deltaTime;

        this.socket.emit("movePlayer", {
            x: this.transform.position.x,
            y: this.transform.position.y,
            dir: this.transform.direction.dir,
        });
    }

    draw(ctx, frame, camera, canvas) {
        let pos = {
            x: this.transform.position.x - camera.transform.position.x,
            y: this.transform.position.y - camera.transform.position.y,
        }

        this.img.draw(
            ctx,
            frame,
            0,
            pos.x,
            pos.y,
            1,
            canvas,
        );
    }
}