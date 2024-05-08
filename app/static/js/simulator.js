import Block from "./block.js";
import Vec2 from "./vector.js";
import Constants from "./constants.js";
class ElectricFieldSimulator {
    constructor(canvas) {
        this.canvas = canvas;
        this.blocks = [];
        this.charges = [];
        this.staticCharges = [];
        this.testCharges = [];
        this.prevtimestamp = 0;
        this.pause = true;
        this.chargedSurfaceActive = true;
        this.canvas.width = window.innerWidth - 42;
        this.canvas.height = window.innerHeight - 400;
        this.context = this.canvas.getContext('2d');
    }
    init() {
        // let this be infinitely large surface (negative charge)
        // this can be turn on/off
        // block below does not contain electric field logic
        let surface = new Block("chargedSurface#1", { x: 0, y: this.canvas.height - 20 }, { x: this.canvas.width, y: 20 }, "#4a4949");
        this.blocks.push(surface);
        this.loop(0);
    }
    drawLegend() {
        this.context.beginPath();
        this.context.moveTo(20, 20); // center
        this.context.lineTo(20, 120); // Y
        this.context.moveTo(20, 20); // center
        this.context.lineTo(120, 20); // X
        // X arrow:
        this.context.moveTo(120, 20);
        this.context.lineTo(100, 10);
        this.context.moveTo(120, 20);
        this.context.lineTo(100, 30);
        // Y arrow:
        this.context.moveTo(20, 120);
        this.context.lineTo(10, 100);
        this.context.moveTo(20, 120);
        this.context.lineTo(30, 100);
        // Y symbol:
        this.context.moveTo(50, 110);
        this.context.lineTo(44, 100);
        this.context.moveTo(50, 110);
        this.context.lineTo(56, 100);
        this.context.moveTo(50, 110);
        this.context.lineTo(50, 125);
        // X symbol:
        this.context.moveTo(115, 65);
        this.context.lineTo(100, 45);
        this.context.moveTo(100, 65);
        this.context.lineTo(115, 45);
        // draw:
        this.context.stroke();
    }
    placeCharge(charge) {
        this.charges.push(charge);
    }
    placeStaticCharge(staticCharge) {
        this.staticCharges.push(staticCharge);
    }
    placeTestCharge(testCharge) {
        this.testCharges.push(testCharge);
    }
    loop(timestamp) {
        let dt = (timestamp - this.prevtimestamp) * 0.001;
        this.prevtimestamp = timestamp;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        if (!this.pause) {
            this.update(dt);
        }
        this.drawLegend();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update(dt) {
        // Electric field from infinitely large surface at the bottom
        let y = 0;
        if (this.chargedSurfaceActive) {
            y = -10 * Math.pow(10, -12);
        }
        const surfaceField = { x: 0, y: y };
        const movingCharges = [
            ...this.charges,
            ...this.testCharges
        ];
        movingCharges.forEach((charge) => {
            const fieldSuperposition = this.computeFieldSuperposition(charge);
            const fieldTotal = Vec2.add(surfaceField, fieldSuperposition);
            let force = Vec2.multiply(fieldTotal, -charge.magnitude);
            charge.applyForce(force);
            charge.update(dt);
        });
    }
    computeFieldSuperposition(charge) {
        let fieldSuperposition = { x: 0, y: 0 };
        const electricFields = [
            ...this.charges,
            ...this.staticCharges
        ];
        const otherElectricFields = electricFields.filter((field) => {
            return field.id !== charge.id;
        });
        otherElectricFields.forEach((field) => {
            const d = Vec2.distance(field.pos, charge.pos);
            if (d < 1) {
                return {
                    x: 0,
                    y: 0
                };
            }
            const cos = (field.pos.x - charge.pos.x) / d;
            const sin = (field.pos.y - charge.pos.y) / d;
            let fieldVector = {
                x: field.magnitude * cos / Math.pow(d, 2),
                y: field.magnitude * sin / Math.pow(d, 2)
            };
            fieldSuperposition = Vec2.add(fieldSuperposition, fieldVector);
        });
        fieldSuperposition = Vec2.multiply(fieldSuperposition, Constants.ELECTRIC_CONSTANT);
        return fieldSuperposition;
    }
    draw() {
        const drawables = [
            ...this.charges,
            ...this.staticCharges,
            ...this.testCharges,
            ...this.blocks
        ];
        drawables.forEach((drawable) => {
            drawable.draw(this.context);
        });
    }
    restart() {
        this.blocks = [];
        this.staticCharges = [];
        this.charges = [];
        this.testCharges = [];
        this.prevtimestamp = 0;
        this.init();
        this.pause = true;
    }
}
export default ElectricFieldSimulator;
//# sourceMappingURL=simulator.js.map