import { Transform } from './tools.js';
import { Perlin } from './perlin.js'

export class Tiles {
    constructor(worldSize=256, seed=1) {
        this.tiles = [0] * worldSize;
        this.perlin = new Perlin(seed);
    }

    snap(x,y) {
        const dx = Math.floor(x / 64) * 64;
        const dy = Math.floor(y / 64) * 64;
        return { dx, dy };
    }

    grabType(result) {
        if (result <= 0) {
            return 1
        } else if (result <= 100) {
            return 2
        } else {
            return 3
        }
    }

    generate(s) {
        for (let x=0; x < this.worldSize; x++) {
            for (let y=0; y < this.worldSize; y++) {
                const p = this.perlin.noise(this.snap(x,y));
                this.grabType(p);
            }
        }
    }
}