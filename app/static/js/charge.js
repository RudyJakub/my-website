class Charge {
    constructor(id, initial_pos, initial_vel, magnitude, mass, radius) {
        this.id = id;
        this.pos = initial_pos;
        this.vel = initial_vel;
        this.acc = { x: 0, y: 0 };
        this.magnitude = magnitude;
        this.mass = mass;
        this.radius = radius;
    }
    getColor() {
        if (this.magnitude > 0) {
            return "#c82124";
        }
        else if (this.magnitude < 0) {
            return "#3370d4";
        }
        else {
            return "#5F9EA0";
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    update(dt) {
        this.vel = {
            x: this.vel.x + this.acc.x * dt,
            y: this.vel.y + this.acc.y * dt
        };
        this.pos = {
            x: this.pos.x + this.vel.x * dt,
            y: this.pos.y + this.vel.y * dt
        };
    }
    applyForce(force) {
        this.acc = {
            x: force.x / this.mass,
            y: force.y / this.mass
        };
    }
}
export default Charge;
//# sourceMappingURL=charge.js.map