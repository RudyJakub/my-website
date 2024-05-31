import Ball from "./ball.js";
import Vec2 from "./vector.js";

enum Border {
    NONE = 0,
    TOP = 1,
    BOTTOM = 2,
    LEFT = 3,
    RIGHT = 4
}

class Collisions {
    private context: CanvasRenderingContext2D;
    private prevtimestamp = 0
    public pause = false
    public balls: Ball[] = []

    constructor(private canvas: HTMLCanvasElement) {
        this.context = this.canvas.getContext('2d')!
        for (let i = 1; i <= 16; i++) {
            const ball = new Ball(
                {
                    x: 100 + Math.random() * this.canvas.width / 2,
                    y: 100 + Math.random() * this.canvas.height / 2
                }, Math.random() * 25 + 25, this.getRandomColor()
            )
            ball.vel.x = (Math.random() - 0.5) * 640
            ball.vel.y = (Math.random() - 0.5) * 320
            ball.acc.y = 100
            this.balls.push(ball)
        }
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    init() {
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

    checkBallCollisionWithBorders(ball: Ball): Border {
        if ((ball.pos.y - ball.radius) <= 0) return Border.TOP
        if ((ball.pos.y + ball.radius) >= this.canvas.height) return Border.BOTTOM
        if ((ball.pos.x - ball.radius) <= 0) return Border.LEFT
        if ((ball.pos.x + ball.radius) >= this.canvas.width) return Border.RIGHT
        return Border.NONE
    }

    loop(timestamp: number) {
        let dt = (timestamp - this.prevtimestamp) * 0.001
        this.prevtimestamp = timestamp
        this.draw();
        if (!this.pause) {
            this.update(dt);
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }

    update(dt: number) {
        this.balls.forEach(ball => {
            const collision = this.checkBallCollisionWithBorders(ball)
            if (collision === Border.BOTTOM || collision === Border.TOP) {
                ball.vel.y = - ball.vel.y
            }
            if (collision === Border.LEFT || collision === Border.RIGHT) {
                ball.vel.x = - ball.vel.x
            }
    
            ball.update(dt)
        })
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.balls.forEach(ball => ball.draw(this.context))
        this.drawLegend()
    }
}

export default Collisions