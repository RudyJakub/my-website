import Block from "./block.js";
import Charge from "./charge.js";
class Game {
    constructor() {
        this.blocks = [];
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth - 42;
        this.canvas.height = window.innerHeight - 400;
        this.context = this.canvas.getContext('2d');
    }
    init() {
        let block = new Block({ x: 100, y: 50 }, { x: 600, y: 150 }, "#c54111");
        this.blocks.push(block);
        let charge = new Charge(0, { x: 200, y: 700 });
        this.blocks.push(charge);
        window.requestAnimationFrame(this.loop.bind(this));
    }
    loop(timestamp) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.update();
        // Keep requesting new frames
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update() {
    }
    draw() {
        this.blocks.forEach((block) => {
            block.draw(this.context);
        });
    }
}
export default Game;
//# sourceMappingURL=game.js.map