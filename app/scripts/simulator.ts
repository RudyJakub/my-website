import Block from "./block.js";
import Charge from "./charge.js"
import Vec2 from "./vector.js";
import {IDrawable, ICentralElectricField, IChargedParticle } from "./interfaces.js";
import Constants from "./constants.js";
import StaticCharge from "./staticCharge.js";
import TestCharge from "./testCharge.js";

class ElectricFieldSimulator {
    private context: CanvasRenderingContext2D;
    private blocks: IDrawable[] = []
    private charges: Charge[] = []
    private staticCharges: StaticCharge[] = []
    private testCharges: TestCharge[] = []
    private prevtimestamp: number = 0
    public pause: boolean = true

    constructor(private canvas: HTMLCanvasElement) {
        this.canvas.width = window.innerWidth - 42
        this.canvas.height = window.innerHeight - 400
        this.context = this.canvas.getContext('2d')!;

    }

    init() {
        // let this be infinitely large surface (negative charge)
        let surface = new Block(
            "chargedSurface#1",
            { x: 0, y: this.canvas.height - 20} as Vec2,
            { x: this.canvas.width, y: 20} as Vec2,
            "#4a4949"
        );

        this.blocks.push(surface)
        this.loop(0)
    }

    placeCharge(charge: Charge) {
        this.charges.push(charge)
    }

    placeStaticCharge(staticCharge: StaticCharge) {
        this.staticCharges.push(staticCharge)
    }

    placeTestCharge(testCharge: TestCharge) {
        this.testCharges.push(testCharge)
    }

    loop(timestamp: number) {
        let dt = (timestamp - this.prevtimestamp) * 0.001
        this.prevtimestamp = timestamp
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        if (!this.pause) {
            this.update(dt);
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }

    update(dt: number) {
        // Electric field from infinitely large surface at the bottom
        const SurfaceField = { x: 0, y: 0 }
        const movingCharges = [
            ...this.charges as IChargedParticle[],
            ...this.testCharges as IChargedParticle[]
        ]
        movingCharges.forEach((charge) => {
            const fieldSuperposition = this.computeFieldSuperposition(charge)
            const fieldTotal = Vec2.add(SurfaceField, fieldSuperposition)
            let force = Vec2.multiply(fieldTotal, -charge.magnitude)
            charge.applyForce(force)
            charge.update(dt)
        })
    }

    computeFieldSuperposition(charge: IChargedParticle): Vec2 {
        let fieldSuperposition: Vec2 = { x: 0, y: 0 }
        const electricFields: ICentralElectricField[] = [
            ...this.charges as ICentralElectricField[],
            ...this.staticCharges as ICentralElectricField[]
        ]
        const otherElectricFields = electricFields.filter((field) => {
            return field.id !== charge.id
        })
        otherElectricFields.forEach((field) => {
            const d = Vec2.distance(field.pos, charge.pos)
            if (d < 1) {
                return {
                    x: 0,
                    y: 0
                }
            }
            const cos = (field.pos.x - charge.pos.x) / d
            const sin = (field.pos.y - charge.pos.y) / d
            let fieldVector = {
                x: field.magnitude * cos / Math.pow(d, 2),
                y: field.magnitude * sin / Math.pow(d, 2)
            }
            fieldSuperposition = Vec2.add(fieldSuperposition, fieldVector)
        })
        fieldSuperposition = Vec2.multiply(fieldSuperposition, Constants.ELECTRIC_CONSTANT)
        console.log(fieldSuperposition)
        return fieldSuperposition
    }

    draw() {
        const drawables: IDrawable[] = [
            ...this.charges,
            ...this.staticCharges,
            ...this.testCharges,
            ...this.blocks
        ]
        drawables.forEach((drawable) => {
            drawable.draw(this.context)
        })
    }

    restart() {
        this.blocks = []
        this.staticCharges = []
        this.charges = []
        this.testCharges = []
        this.prevtimestamp = 0
        this.init()
        this.pause = true
    }
}

export default ElectricFieldSimulator
