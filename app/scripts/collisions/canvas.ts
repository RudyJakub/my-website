import Collisions from "./collisions.js";

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
canvas.width = window.innerWidth - 42
canvas.height = window.innerHeight - 400

const scene = new Collisions(canvas)
scene.init()