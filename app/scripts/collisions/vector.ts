class Vec2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static add(u: Vec2, v: Vec2): Vec2 {
        const w: Vec2 = {
            x: u.x + v.x,
            y: u.y + v.y
        }
        return w
    }

    static multiply(u: Vec2, scalar: number): Vec2 {
        const v: Vec2 = {
            x: u.x * scalar,
            y: u.y * scalar
        }
        return v
    }

    static distance(u: Vec2, v: Vec2): number {
        return Math.sqrt((Math.pow((v.x - u.x), 2) + Math.pow((v.y - u.y), 2)))
    }

    static abs(v: Vec2): number {
        return Math.pow(v.x*v.x+v.y+v.y, 0.5)
    }
}

export default Vec2
