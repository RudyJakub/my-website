import { IDrawable } from "./interfaces";
import Vec2 from "./vector";

class Block implements IDrawable {
    constructor(public id: string, public pos: Vec2, public size: Vec2, public color: string) {}

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    update(dt: number): void {
        
    }
}

export default Block