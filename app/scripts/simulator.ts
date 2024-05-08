import Block from "./block.js";
import MovingCharge from "./movingCharge.js"
import Vec2 from "./vector.js";
import {IDrawable, ICentralElectricField, IChargedParticle } from "./interfaces.js";
import Constants from "./constants.js";
import StaticCharge from "./staticCharge.js";
import TestCharge from "./testCharge.js";

class ElectricFieldSimulator {
    private context: CanvasRenderingContext2D;
    private blocks: IDrawable[] = []
    private movingCharges: MovingCharge[] = []
    private staticCharges: StaticCharge[] = []
    private testCharges: TestCharge[] = []
    private prevtimestamp: number = 0
    public pause: boolean = true
    public chargedSurfaceActive = true

    constructor(private canvas: HTMLCanvasElement) {
        this.canvas.width = window.innerWidth - 42
        this.canvas.height = window.innerHeight - 400
        this.context = this.canvas.getContext('2d')!;

    }

    init() {
        // let this be infinitely large surface (negative charge)
        // this can be turn on/off
        // block below does not contain electric field logic
        let surface = new Block(
            "chargedSurface#1",
            { x: 0, y: this.canvas.height - 20} as Vec2,
            { x: this.canvas.width, y: 20} as Vec2,
            "#4a4949"
        );

        this.blocks.push(surface)
        this.loop(0)
    }

    drawLegend() {
        this.context.beginPath()
        this.context.moveTo(20, 20) // center
        this.context.lineTo(20, 120) // Y
        this.context.moveTo(20, 20) // center
        this.context.lineTo(120, 20) // X
        // X arrow:
        this.context.moveTo(120, 20)
        this.context.lineTo(100, 10)
        this.context.moveTo(120, 20)
        this.context.lineTo(100, 30)
        // Y arrow:
        this.context.moveTo(20, 120)
        this.context.lineTo(10, 100)
        this.context.moveTo(20, 120)
        this.context.lineTo(30, 100)
        // Y symbol:
        this.context.moveTo(50, 110)
        this.context.lineTo(44, 100)
        this.context.moveTo(50, 110)
        this.context.lineTo(56, 100)
        this.context.moveTo(50, 110)
        this.context.lineTo(50, 125)
        // X symbol:
        this.context.moveTo(115, 65)
        this.context.lineTo(100, 45)
        this.context.moveTo(100, 65)
        this.context.lineTo(115, 45)
        // draw:
        this.context.stroke()
    }

    placeMovingCharge(movingCharge: MovingCharge) {
        this.movingCharges.push(movingCharge)
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
        this.drawLegend()
        window.requestAnimationFrame(this.loop.bind(this));
    }

    update(dt: number) {
        // Electric field from infinitely large surface at the bottom
        let y = 0
        if (this.chargedSurfaceActive) {
            y = -10 * Math.pow(10, -12)
        }
        const surfaceField = { x: 0, y: y }
        const movingCharges = [
            ...this.movingCharges as IChargedParticle[],
            ...this.testCharges as IChargedParticle[]
        ]
        movingCharges.forEach((charge) => {
            const fieldSuperposition = this.computeFieldSuperposition(charge)
            const fieldTotal = Vec2.add(surfaceField, fieldSuperposition)
            let force = Vec2.multiply(fieldTotal, -charge.magnitude)
            charge.applyForce(force)
            charge.update(dt)
        })
    }

    computeFieldSuperposition(charge: IChargedParticle): Vec2 {
        let fieldSuperposition: Vec2 = { x: 0, y: 0 }
        const electricFields: ICentralElectricField[] = [
            ...this.movingCharges as ICentralElectricField[],
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
        return fieldSuperposition
    }

    draw() {
        const drawables: IDrawable[] = [
            ...this.movingCharges,
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
        this.movingCharges = []
        this.testCharges = []
        this.prevtimestamp = 0
        this.init()
        this.pause = true
    }
}

export default ElectricFieldSimulator
