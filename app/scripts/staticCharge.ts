import { IStaticChargedParticle, ICentralElectricField } from "./interfaces.js";
import Vec2 from "./vector.js";

class StaticCharge implements IStaticChargedParticle, ICentralElectricField {
    public id: string
    public pos: Vec2
    public magnitude: number
    public mass: number
    protected radius: number

    constructor(
        id: string,
        initial_pos: Vec2,
        magnitude: number,
        mass: number
    ) {
        this.id = id
        this.pos = initial_pos
        this.magnitude = magnitude
        this.mass = mass
        this.radius = 12
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
        
    }
}

export default StaticCharge
