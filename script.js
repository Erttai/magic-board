"strict mode";
const container = document.querySelector(".container");
const btns = document.querySelectorAll(".grid-size");
const blackBtn = document.getElementById("blackBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#b7b2b2";
const DEFAULT_MODE = "black";

let currentMode = "black";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeMode(mode) {
  currentMode = mode;
  activeButton();
}

function activeButton() {}

function changecolor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "black") {
    e.target.style.backgroundColor = "#b7b2b2";
  } else if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256) + 1;
    const randomG = Math.floor(Math.random() * 256) + 1;
    const randomB = Math.floor(Math.random() * 256) + 1;
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  }
  // if (currentMode === "rainbow") {
  //   const randomR = Math.floor(Math.random() * 256);
  //   const randomG = Math.floor(Math.random() * 256);
  //   const randomB = Math.floor(Math.random() * 256);
  //   e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  // } else if (currentMode === "color") {
  //   e.target.style.backgroundColor = currentColor;
  // } else if (currentMode === "eraser") {
  //   e.target.style.backgroundColor = "#fefefe";
  // }
}

function settingGrid(size = DEFAULT_SIZE) {
  container.style.setProperty("grid-template-columns", `repeat(${size}, auto)`);

  for (let i = 0; i < size * size; i++) {
    const content = document.createElement("div");
    content.style.background = "#e6e6e6";
    content.classList.add("grid-element");
    content.addEventListener("mouseover", changecolor);
    content.addEventListener("mousedown", changecolor);
    container.appendChild(content);
  }
}

function clearGrid() {
  container.innerHTML = "";
}

btns.forEach(btn =>
  btn.addEventListener("click", e => {
    clearGrid();
    settingGrid(e.target.id);
  })
);

settingGrid();
