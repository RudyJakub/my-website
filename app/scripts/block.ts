import Vec2 from "./vec";

class Block {
    constructor(public pos: Vec2, public size: Vec2) {}

    draw(ctx: CanvasRenderingContext2D) {
        let randomColor = Math.random() > 0.5? '#45808f' : '#0099b0';
        ctx.fillStyle = randomColor;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

export default Block