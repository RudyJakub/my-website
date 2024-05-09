import Vec2 from "./vector"

interface ISpaceElement {
    id: string
    pos: Vec2
}

interface IDrawable extends ISpaceElement {
    draw(ctx: CanvasRenderingContext2D): void
    update(dt: number): void
}

interface IChargedParticle extends IDrawable {
    mass: number
    vel: Vec2
    magnitude: number
    applyForce(force: Vec2): void
}

interface ICentralElectricField extends ISpaceElement {
    magnitude: number,
}

export { IDrawable, IChargedParticle, ICentralElectricField }
