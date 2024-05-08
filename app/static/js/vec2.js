class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static add(u, v) {
        const w = {
            x: u.x + v.x,
            y: u.y + v.y
        };
        return w;
    }
}
export default Vec2;
//# sourceMappingURL=vec2.js.map