"strict mode";
const container = document.querySelector(".container");
const btns = document.querySelectorAll(".grid-size");
const colorBtn = document.getElementById("colorBtn");
const colorPicker = document.getElementById("colorPicker");
const classicBtn = document.getElementById("classicBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const smallGridBtn = document.getElementById("16");
const mediumGridBtn = document.getElementById("32");
const largeGridBtn = document.getElementById("48");
const eraseBtn = document.getElementById("eraseBtn");
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";

let currentMode = "color";
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeMode(mode) {
  currentMode = mode;
  activeButton(currentMode);
}

function setCurrentColor(color) {
  currentColor = color;
}

function activeButton(currentMode) {
  if (currentMode === "classic") {
    classicBtn.classList.add("active");
    colorBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.add("active");
    classicBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "rainbow") {
    colorBtn.classList.remove("active");
    classicBtn.classList.remove("active");
    rainbowBtn.classList.add("active");
  }
}

function updateSize(size) {
  currentSize = size;
  activeSizeButton(currentSize);
}

function activeSizeButton(currentSize) {
  if (currentSize === 16) {
    smallGridBtn.classList.add("active");
    mediumGridBtn.classList.remove("active");
    largeGridBtn.classList.remove("active");
  } else if (currentSize === 32) {
    smallGridBtn.classList.remove("active");
    mediumGridBtn.classList.add("active");
    largeGridBtn.classList.remove("active");
  } else if (currentSize === 48) {
    smallGridBtn.classList.remove("active");
    mediumGridBtn.classList.remove("active");
    largeGridBtn.classList.add("active");
  }
}

function changecolor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256) + 1;
    const randomG = Math.floor(Math.random() * 256) + 1;
    const randomB = Math.floor(Math.random() * 256) + 1;
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "classic") {
    e.target.style.backgroundColor = "#b7b2b2";
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  }
  // } else if (currentMode === "eraser") {
  //   e.target.style.backgroundColor = "#fefefe";
  // }
}

function settingGrid(size) {
  container.style.setProperty("grid-template-columns", `repeat(${size}, auto)`);

  for (let i = 0; i < size * size; i++) {
    const content = document.createElement("div");
    content.classList.add("grid-element");
    content.addEventListener("mouseover", changecolor);
    content.addEventListener("mousedown", changecolor);
    container.appendChild(content);
  }
}

function clearGrid() {
  container.innerHTML = "";
}

function eraseGrid(size) {
  clearGrid();
  settingGrid(currentSize);
}

//----------------Event listeners--------------------
//Modify grid's size
btns.forEach(btn =>
  btn.addEventListener("click", e => {
    // updateSize(e.target.id);
    clearGrid();
    settingGrid(e.target.id);
  })
);

//Color mode
colorBtn.addEventListener("click", function () {
  changeMode("color");
});
classicBtn.addEventListener("click", function () {
  changeMode("classic");
});
rainbowBtn.addEventListener("click", function () {
  changeMode("rainbow");
});

colorPicker.addEventListener("input", e => setCurrentColor(e.target.value));

//Switch active class in size buttons
smallGridBtn.addEventListener("click", function () {
  smallGridBtn.classList.add("active");
  mediumGridBtn.classList.remove("active");
  largeGridBtn.classList.remove("active");
});
mediumGridBtn.addEventListener("click", function () {
  smallGridBtn.classList.remove("active");
  mediumGridBtn.classList.add("active");
  largeGridBtn.classList.remove("active");
});
largeGridBtn.addEventListener("click", function () {
  smallGridBtn.classList.remove("active");
  mediumGridBtn.classList.remove("active");
  largeGridBtn.classList.add("active");
});

//Clean Grid
eraseBtn.addEventListener("click", eraseGrid);

settingGrid(DEFAULT_SIZE);
changeMode(DEFAULT_MODE);
updateSize(DEFAULT_SIZE);
