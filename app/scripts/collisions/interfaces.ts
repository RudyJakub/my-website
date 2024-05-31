interface IDrawable {
    draw(ctx: CanvasRenderingContext2D): void
    update(dt: number): void
}

export { IDrawable }
