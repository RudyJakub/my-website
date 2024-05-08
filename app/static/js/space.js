import Block from "./block.js";
import Charge from "./charge.js";
import Vec2 from "./vector.js";
import Constants from "./constants.js";
import StaticCharge from "./staticCharge.js";
class Space {
    constructor(canvas) {
        this.canvas = canvas;
        this.blocks = [];
        this.charges = [];
        this.staticCharges = [];
        this.prevtimestamp = 0;
        this.pause = true;
        this.canvas.width = window.innerWidth - 42;
        this.canvas.height = window.innerHeight - 400;
        this.context = this.canvas.getContext('2d');
    }
    init() {
        // let this be infinitely large surface (negative charge)
        let surface = new Block("chargedSurface#1", { x: 0, y: this.canvas.height - 20 }, { x: this.canvas.width, y: 20 }, "#4a4949");
        this.blocks.push(surface);
        this.placeCharges();
        this.placeStaticCharges();
        this.loop(0);
    }
    placeCharges() {
        const charge = new Charge("charge#1", { x: 200, y: 700 }, { x: 200, y: 0 }, Constants.ELEMENTARY_CHARGE, Constants.ELECTRON_MASS);
        this.charges.push(charge);
    }
    placeStaticCharges() {
        const charge = new StaticCharge("staticCharge#1", { x: 800, y: 400 }, -Constants.ELEMENTARY_CHARGE * 10000, Constants.ELECTRON_MASS);
        const charge2 = new StaticCharge("staticCharge#1", { x: 700, y: 400 }, -Constants.ELEMENTARY_CHARGE * 10000, Constants.ELECTRON_MASS);
        const charge3 = new StaticCharge("staticCharge#1", { x: 600, y: 400 }, Constants.ELEMENTARY_CHARGE * 10000, Constants.ELECTRON_MASS);
        const charge4 = new StaticCharge("staticCharge#1", { x: 500, y: 400 }, -Constants.ELEMENTARY_CHARGE * 10000, Constants.ELECTRON_MASS);
        const charge5 = new StaticCharge("staticCharge#1", { x: 400, y: 400 }, -Constants.ELEMENTARY_CHARGE * 10000, Constants.ELECTRON_MASS);
        this.staticCharges.push(charge, charge2, charge3, charge4, charge5);
    }
    loop(timestamp) {
        let dt = (timestamp - this.prevtimestamp) * 0.001;
        this.prevtimestamp = timestamp;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        if (!this.pause) {
            this.update(dt);
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update(dt) {
        // Electric field from infinitely large surface at the bottom
        const SurfaceField = { x: 0, y: 2 * Math.pow(10, -10) };
        this.charges.forEach((charge) => {
            const fieldSuperposition = this.computeFieldSuperposition(charge);
            const fieldTotal = Vec2.add(SurfaceField, fieldSuperposition);
            let force = Vec2.multiply(fieldTotal, charge.magnitude);
            charge.applyForce(force);
            charge.logPosition();
            charge.update(dt);
        });
    }
    restart() {
        this.blocks = [];
        this.staticCharges = [];
        this.charges = [];
        this.prevtimestamp = 0;
        this.init();
        this.pause = true;
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
            fieldSuperposition.x += field.magnitude * Constants.ELECTRIC_CONSTANT / Math.pow((field.pos.x - charge.pos.x), 2);
            fieldSuperposition.y += field.magnitude * Constants.ELECTRIC_CONSTANT / Math.pow((field.pos.y - charge.pos.y), 2);
        });
        return fieldSuperposition;
    }
    draw() {
        const drawables = [
            ...this.charges,
            ...this.staticCharges,
            ...this.blocks
        ];
        drawables.forEach((drawable) => {
            drawable.draw(this.context);
        });
    }
}
export default Space;
//# sourceMappingURL=space.js.map