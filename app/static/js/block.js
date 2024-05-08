class Block {
    constructor(id, pos, size, color) {
        this.id = id;
        this.pos = pos;
        this.size = size;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(dt) {
    }
}
export default Block;
//# sourceMappingURL=block.js.map