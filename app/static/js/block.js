class Block {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    draw(ctx) {
        let randomColor = Math.random() > 0.5 ? '#45808f' : '#0099b0';
        ctx.fillStyle = randomColor;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}
export default Block;
//# sourceMappingURL=block.js.map