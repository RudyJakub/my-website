import { IParticle, ICentralElectricField, IDrawable } from "./interfaces.js";
import Vec2 from "./vector.js";

class Charge implements IParticle, ICentralElectricField, IDrawable {
    public id: string
    public pos: Vec2
    public vel: Vec2
    public acc: Vec2
    public magnitude: number
    public mass: number
    protected radius: number
    
    constructor(
        id: string,
        initial_pos: Vec2,
        initial_vel: Vec2,
        magnitude: number,
        mass: number,
        radius: number
    ) {
        this.id = id
        this.pos = initial_pos
        this.vel = initial_vel
        this.acc = { x: 0, y: 0 }
        this.magnitude = magnitude
        this.mass = mass
        this.radius = radius
    }

    getColor(): string {
        if (this.magnitude > 0) {
            return "#c82124"
        } else if (this.magnitude < 0) {
            return "#3370d4"
        } else {
            return "#5F9EA0"
        }
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.getColor();
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

    applyForce(force: Vec2) {
        this.acc = {
            x: force.x / this.mass,
            y: force.y / this.mass
        }

    }
}

export default Charge
