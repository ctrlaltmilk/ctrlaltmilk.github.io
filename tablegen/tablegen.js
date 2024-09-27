const form = document.getElementById("form");

const func = form.elements["function"];
const prefix = form.elements["prefix"];
const count = form.elements["count"];

const output = document.getElementById("output");

const bin2Rad = (Math.PI * 2) / 0x100;

function clamp(i, min, max) {
    return Math.max(Math.min(i, max), min);
}

function fixTwosComplement(i) {
    if (i < 0) {
        return 0x100 + i;
    }
    return i;
}

function update() {
    let fn;

    switch (func.value) {
        case "sin":
            fn = (x) => Math.sin(bin2Rad * x);
            break;
        case "cos":
            fn = (x) => Math.cos(bin2Rad * x);
            break;
        case "tan":
            fn = (x) => Math.tan(bin2Rad * x);
            break;
        case "invsqrt":
            fn = (x) => 1 / Math.sqrt(x);
            break;
        case "recip":
            fn = (x) => 1 / x;
            break;
    }

    let s = "";

    let end = parseInt(count.value);
    for (let i = 0; i < end; i++) {
        s += prefix.value + fixTwosComplement(
            clamp(Math.floor(fn(i) * 0x80), -0x80, 0x7f)
        ).toString(16).padStart(2, "0");

        if (i % 16 == 15) {
            s += "\n";
        } else {
            s += " ";
        }
    }

    output.innerText = s;
}

form.addEventListener("input", update);
update();
