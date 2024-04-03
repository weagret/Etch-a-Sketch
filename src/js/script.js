const createElem = (tagName, properties) => {
    return Object.assign(document.createElement(tagName), properties);
};
const calculateSize = (elemSize) => {
    return `${60 / elemSize}vw`;
};
let drawingMode = "color";
const defaultBtnColor = "#202020";
const selectedBtnColor = "#808080";
let gridLineBtnSelected = false;


function makeGrid(size) {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    for (let row = 0; row < size; row++) {
        let rowDiv = createElem("div", { className: "row" });
        fillRowWithElems(size, rowDiv);
        container.appendChild(rowDiv);
    }
}
function fillRowWithElems(size, rowDiv) {
    for (let elem = 0; elem < size; elem++) {
        let elemDiv = createElem("div", {
            className: "elem",
            style: `
                width: ${calculateSize(size)};
                height: ${calculateSize(size)};
            `
        });
        rowDiv.appendChild(elemDiv);
    }
}
function addBtnSelectedStyles(e) {
    let btns = document.querySelectorAll(".settings > button");
    for (let i = 0; i < 3; i++) {
        btns[i].style.backgroundColor = defaultBtnColor;
    }
    e.style.backgroundColor = selectedBtnColor;
}
function addGridLines() {
    let elems = document.querySelectorAll(".elem");
    elems.forEach((e) => {
        e.classList.add("border");
    });
}
function removeGridLines() {
    let elems = document.querySelectorAll(".elem");
    elems.forEach((e) => {
        e.classList.remove("border");
    });
}
function addOrRemoveGridLines() {
    if (gridLineBtnSelected) {
        addGridLines();
    } else {
        removeGridLines();
    }
}
function changeGridLineBtnColor() {
    let gridLineBtn = document.querySelectorAll("button")[3];
    if (!gridLineBtnSelected) {
        gridLineBtn.style.backgroundColor = selectedBtnColor;
        gridLineBtnSelected = true;
    } else {
        gridLineBtn.style.backgroundColor = defaultBtnColor;
        gridLineBtnSelected = false;
    }
}
function clearGrid() {
    let elems = document.querySelectorAll(".elem");
    elems.forEach((e) => {
        e.style.backgroundColor = "white";
    });
}
function addEventListenerForBtns() {
    let allBtns = document.querySelectorAll(".settings > button");
    allBtns.forEach((e) => {
        e.addEventListener("click", () => {
            switch (e.innerHTML) {
                case "color":
                case "rainbow":
                case "eraser":
                    addBtnSelectedStyles(e);
                    drawingMode = e.innerHTML; break;
                case "grid-lines":
                    changeGridLineBtnColor();
                    addOrRemoveGridLines();
                    break;
                case "clear": clearGrid();
            };
        });
    });
}
function updateRangeInputText(rangeInput) {
    let textArea = document.querySelector(".settings > p");
    textArea.innerHTML = rangeInput.value + " X " + rangeInput.value;
}
function updateRangeInput() {
    let rangeInput = document.querySelector("input[type=range]");
    updateRangeInputText(rangeInput);
    makeGrid(rangeInput.value);
    addOrRemoveGridLines();
}
function main() {
    makeGrid(document.querySelector("input[type=range]").value);
    addEventListenerForBtns();
}

main();