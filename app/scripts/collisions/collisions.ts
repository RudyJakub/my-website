class Collisions {
    private context: CanvasRenderingContext2D;
    private prevtimestamp = 0
    public pause = false

    constructor(private canvas: HTMLCanvasElement) {
        this.context = this.canvas.getContext('2d')!
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
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLegend()
    }
}

export default Collisions