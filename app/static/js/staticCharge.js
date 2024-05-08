class StaticCharge {
    constructor(id, initial_pos, magnitude, mass) {
        this.id = id;
        this.pos = initial_pos;
        this.magnitude = magnitude;
        this.mass = mass;
        this.radius = 12;
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
    }
}
export default StaticCharge;
//# sourceMappingURL=staticCharge.js.map