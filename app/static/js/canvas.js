import Block from "./block.js";
let canvas;
let context;
let block = new Block({ x: 100, y: 50 }, { x: 150, y: 150 });
window.onload = init;
function init() {
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth - 42;
    canvas.height = window.innerHeight - 400;
    context = canvas.getContext('2d');
    // Start the first frame request
    window.requestAnimationFrame(loop);
}
function loop(timestamp) {
    draw();
    update();
    // Keep requesting new frames
    window.requestAnimationFrame(loop);
}
function update() {
    block.pos.x += 5;
    block.pos.y += 5;
    block.size.x += 2;
    block.size.y += 2;
}
function draw() {
    block.draw(context);
}
//# sourceMappingURL=canvas.js.map