import ElectricFieldSimulator from "./simulator.js"
import MovingCharge from "./movingCharge.js";
import StaticCharge from "./staticCharge.js";
import Constants from "./constants.js";
import TestCharge from "./testCharge.js";

enum ChargeTypes {
    NORMAL = 1,
    STATIC = 2,
    TEST = 3
}

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
const space = new ElectricFieldSimulator(canvas)
const velX = document.getElementById("velX")! as HTMLInputElement
const velY = document.getElementById("velY")! as HTMLInputElement
const mag = document.getElementById("mag")! as HTMLInputElement
const radio1 = document.getElementById("radio1")! as HTMLInputElement
const radio2 = document.getElementById("radio2")! as HTMLInputElement
const radio3 = document.getElementById("radio3")! as HTMLInputElement
const checkboxswitch = document.getElementById("flexSwitchCheckChecked")! as HTMLInputElement

function getChargeType() {
    if (radio1.checked === true) {
        return ChargeTypes.NORMAL
    }
    if (radio2.checked === true) {
        return ChargeTypes.STATIC
    }
    if (radio3.checked === true) {
        return ChargeTypes.TEST
    }
}

document.getElementById("startButton")!.addEventListener("click", () => {
    console.log("STARTED")
    space.pause = false
})

document.getElementById("pauseButton")!.addEventListener("click", () => {
    console.log("PAUSED")
    space.pause = true
})

document.getElementById("restartButton")!.addEventListener("click", () => {
    console.log("RESTARTING")
    space.restart()
})

canvas.addEventListener("click", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    const relativeY = e.clientY - canvas.offsetTop;
    switch (getChargeType()) {
        case ChargeTypes.NORMAL:
            const movingCharge = new MovingCharge(
                Math.random().toString(),
                { x: relativeX, y: relativeY },
                { x: parseFloat(velX.value), y: parseFloat(velY.value) },
                Constants.ELEMENTARY_CHARGE * -parseFloat(mag.value),
                Constants.ELECTRON_MASS
            )
            space.placeMovingCharge(movingCharge)
            break;
        case ChargeTypes.STATIC:
            const staticCharge = new StaticCharge(
                Math.random().toString(),
                { x: relativeX, y: relativeY },
                Constants.ELEMENTARY_CHARGE * -parseFloat(mag.value),
                Constants.ELECTRON_MASS
            )
            space.placeStaticCharge(staticCharge)
            break;
        case ChargeTypes.TEST:
            const testCharge = new TestCharge(
                Math.random().toString(),
                { x: relativeX, y: relativeY },
                { x: parseFloat(velX.value), y: parseFloat(velY.value) },
                Constants.ELEMENTARY_CHARGE * -parseFloat(mag.value),
                Constants.ELECTRON_MASS
            )
            space.placeTestCharge(testCharge)
            break;
        default:
            console.log("?")
    }
})

checkboxswitch.addEventListener("click", (e) => {
    if (checkboxswitch.checked) {
        space.chargedSurfaceActive = true
    } else {
        space.chargedSurfaceActive = false
    }
})

space.init()
