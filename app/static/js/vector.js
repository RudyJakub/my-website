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
    static multiply(u, scalar) {
        const v = {
            x: u.x * scalar,
            y: u.y * scalar
        };
        return v;
    }
    static distance(u, v) {
        return Math.sqrt((Math.pow((v.x - u.x), 2) + Math.pow((v.y - u.y), 2)));
    }
}
export default Vec2;
//# sourceMappingURL=vector.js.map