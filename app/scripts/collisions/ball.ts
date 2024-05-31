import { IDrawable } from "./interfaces";
import Vec2 from "./vector";

class Ball implements IDrawable {
    public pos: Vec2
    public vel: Vec2 = { x: 0, y: 0 }
    public acc: Vec2 = { x: 0, y: 0 }
    public radius: number
    public color: string

    constructor(pos: Vec2, radius: number, color: string) {
        this.pos = pos
        this.radius = radius
        this.color = color
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke()
        ctx.fill();
    }

    update(dt: number): void {
        this.vel = {
            x: this.vel.x + this.acc.x * dt,
            y: this.vel.y + this.acc.y * dt
        }
        this.pos = {
            x: this.pos.x + this.vel.x * dt,
            y: this.pos.y + this.vel.y * dt
        }
    }
}

export default Ball