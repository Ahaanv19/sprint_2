
class Sprite {
    constructor(src, frameCount, fps) {
        this.image = new Image();
        this.image.src = src;
        this.frameWidth = 64;
        this.frameHeight = 64;
        this.frameCount = frameCount;
        this.fps = fps;
    }

    draw(ctx, frame, row, x, y, scale = 1, canvas) {
        const newFrame = (Math.floor(frame/fps)) % this.frameCount;
        const sx = newFrame * this.frameWidth;
        const sy = row * this.frameHeight;
        const sw = this.frameWidth;
        const sh = this.frameHeight;
        const dw = this.frameWidth * scale;
        const dh = this.frameHeight * scale;

        ctx.drawImage(this.image, sx, sy, sw, sh, x + canvas.width/2, y + canvas.height/2, dw, dh);
    }
}