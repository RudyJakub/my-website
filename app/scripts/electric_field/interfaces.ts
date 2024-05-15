import Vec2 from "./vector"

interface ISpaceElement {
    id: string
    pos: Vec2
}

interface IDrawable {
    draw(ctx: CanvasRenderingContext2D): void
    update(dt: number): void
}

interface IParticle extends ISpaceElement {
    mass: number
    vel: Vec2
    applyForce(force: Vec2): void
}

interface ICentralElectricField extends ISpaceElement {
    magnitude: number
}

export { ISpaceElement, IDrawable, IParticle, ICentralElectricField }
