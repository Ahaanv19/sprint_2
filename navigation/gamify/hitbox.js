import { Tiles } from "objects.js"

export function boxCollide(position) {
    for (let i = 0; i < Tiles.objects.length; i++) {
        const dx = Math.abs(position.x - Tiles.objects[i].x);
        const dy = Math.abs(position.y - Tiles.objects[i].y);
        if (dx < 16) {
            if (dy < 16) {
                return 1;
            }
        }
    }
    return 0;
}