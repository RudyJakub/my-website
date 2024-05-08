import ElectricFieldSimulator from "./simulator.js";
import Charge from "./charge.js";
import Constants from "./constants.js";
var ChargeTypes;
(function (ChargeTypes) {
    ChargeTypes[ChargeTypes["NORMAL"] = 1] = "NORMAL";
    ChargeTypes[ChargeTypes["STATIC"] = 2] = "STATIC";
    ChargeTypes[ChargeTypes["TEST"] = 3] = "TEST";
})(ChargeTypes || (ChargeTypes = {}));
const canvas = document.getElementById('canvas');
const space = new ElectricFieldSimulator(canvas);
const velX = document.getElementById("velX");
const velY = document.getElementById("velY");
const mag = document.getElementById("mag");
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
const radio3 = document.getElementById("radio3");
const checkboxswitch = document.getElementById("flexSwitchCheckChecked");
const checkboxswitch2 = document.getElementById("flexSwitchCheckChecked2");
function getChargeType() {
    if (radio1.checked === true) {
        return ChargeTypes.NORMAL;
    }
    if (radio2.checked === true) {
        return ChargeTypes.STATIC;
    }
    if (radio3.checked === true) {
        return ChargeTypes.TEST;
    }
}
document.getElementById("startButton").addEventListener("click", () => {
    console.log("STARTED");
    space.pause = false;
});
document.getElementById("pauseButton").addEventListener("click", () => {
    console.log("PAUSED");
    space.pause = true;
});
document.getElementById("restartButton").addEventListener("click", () => {
    console.log("RESTARTING");
    space.restart();
});
canvas.addEventListener("mouseover", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    const relativeY = e.clientY - canvas.offsetTop;
    space.mousePos = {
        x: relativeX,
        y: relativeY
    };
});
canvas.addEventListener("click", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    const relativeY = e.clientY - canvas.offsetTop;
    switch (getChargeType()) {
        case ChargeTypes.NORMAL:
            const charge = new Charge(Math.random().toString(), { x: relativeX, y: relativeY }, { x: parseFloat(velX.value), y: parseFloat(velY.value) }, Constants.ELEMENTARY_CHARGE * -parseFloat(mag.value), Constants.ELECTRON_MASS, 8);
            space.placeCharge(charge);
            break;
        case ChargeTypes.STATIC:
            const staticCharge = new Charge(Math.random().toString(), { x: relativeX, y: relativeY }, { x: 0, y: 0 }, Constants.ELEMENTARY_CHARGE * -parseFloat(mag.value), Constants.ELECTRON_MASS, 16);
            space.placeStaticCharge(staticCharge);
            break;
        case ChargeTypes.TEST:
            const testCharge = new Charge(Math.random().toString(), { x: relativeX, y: relativeY }, { x: parseFloat(velX.value), y: parseFloat(velY.value) }, Constants.ELEMENTARY_CHARGE * -parseFloat(mag.value), Constants.ELECTRON_MASS, 4);
            space.placeTestCharge(testCharge);
            break;
        default:
            console.log("?");
    }
});
checkboxswitch.addEventListener("click", (e) => {
    if (checkboxswitch.checked) {
        space.chargedSurfaceActive = true;
    }
    else {
        space.chargedSurfaceActive = false;
    }
});
checkboxswitch2.addEventListener("click", (e) => {
    if (checkboxswitch2.checked) {
        space.chargedMouseActive = true;
    }
    else {
        space.chargedMouseActive = false;
    }
});
space.init();
//# sourceMappingURL=canvas.js.map