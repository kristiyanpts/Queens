let width = null;
let height = null;
let container = document.getElementsByClassName("game-container")[0];
let containerParameters = container.getBoundingClientRect();
let squares;
let playerOneUsername,
  playerTwoUsername,
  playerOneWon = 0,
  playerTwoWon = 0;
let currentTurn = null;
let currentTime = 0;

function AddSquares() {
  for (let i = 1; i <= height; i++) {
    let containerRow = []
    for (let j = 1; j <= width; j++) {
      let child = document.createElement("div");
      child.setAttribute("class", "squares");
      // child.setAttribute("id", i.toString() + " " + j.toString());
      // container.appendChild(child);
      containerRow.appendChild(child);
    }
    container.appendChild(containerRow);
  }
  if (width >= height) {
    squares = Array.from(document.getElementsByClassName("squares"));
    container.style.width = "600px";
    containerParameters = container.getBoundingClientRect();

    for (let i = 0; i < squares.length; i++) {
      let newSize = containerParameters.width / width;
      squares[i].style.width = newSize + "px";
      squares[i].style["font-size"] = newSize / 2 + "px";
    }
  } else {
    squares = Array.from(document.getElementsByClassName("squares"));
    container.style.height = "600px";
    containerParameters = container.getBoundingClientRect();

    for (let i = 0; i < squares.length; i++) {
      let newSize = containerParameters.height / height;
      squares[i].style.height = newSize + "px";
      squares[i].style["font-size"] = newSize / 2 + "px";
    }
  }

  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${height}, 1fr)`;

  // for (let i = 0; i < squares.length; i++) {
  //   squares[i].addEventListener("click", Move);
  // }
  for (let i = 0; i < container.length; i++) {
    for (let j = 0; j < container[i].length; j++) {
      container[i][j].addEventListener("click", Move(i, j));
    }
    
  }
}
function Move(row,col) {
  console.log(container[row][col].style.backgroundColor);
  console.log(container[row][col]);
  if (
    container[row][col].style.backgroundColor === "rgb(161, 128, 224)" ||
    container[row][col].style.backgroundColor === "rgb(124, 62, 247)" ||
    container[row][col].tagName == "I"
  )
    return;
  container[row][col].style.backgroundColor = "rgb(124, 62, 247)";
  container[row][col].innerHTML = "<i class='fa-solid fa-chess-queen'></i>";
  // let id = container[row][col].id;
  // let id = container.indexOf(container[row][col])
  // let moveRow = Number(id.split(" ")[0]);
  // let moveCol = Number(id.split(" ")[1]);
  for (let i = 1; i <= height; i++) {
    // Horizontaly
    // let square = document.getElementById(i.toString() + " " + id.split(" ")[1]);
    let square = container[i][col];
    if (square.style.backgroundColor === "") {
      square.style.backgroundColor = "rgb(161, 128, 224)";
    }
  }
  for (let i = 1; i <= width; i++) {
    // Verticaly
    // let square = document.getElementById(id.split(" ")[0] + " " + i.toString());
    let square = container[row][i];
    if (square.style.backgroundColor === "") {
      square.style.backgroundColor = "rgb(161, 128, 224)";
    }
  }

  for (let i = 0; i < squares.length; i++) {
    // // Diagonally
    // let downRight = (moveRow + i).toString() + " " + (moveCol + i).toString();
    // let upRight = (moveRow - i).toString() + " " + (moveCol + i).toString();
    // let upLeft = (moveRow - i).toString() + " " + (moveCol - i).toString();
    // let downLeft = (moveRow + i).toString() + " " + (moveCol - i).toString();

    // let squareDownRight = document.getElementById(downRight);
    // let squareUpRight = document.getElementById(upRight);
    // let squareUpLeft = document.getElementById(upLeft);
    // let squareDownLeft = document.getElementById(downLeft);

    let squareDownRight = container[row+i][col+i]
    let squareUpRight = container[row-i][col+i]
    let squareUpLeft = container[row-i][col-i]
    let squareDownLeft = container[row+i][col-i]

    if (
      squareDownRight !== null &&
      squareDownRight.style.backgroundColor !== "rgb(124, 62, 247)"
    ) {
      squareDownRight.style.backgroundColor = "rgb(161, 128, 224)";
    }
    if (
      squareUpRight !== null &&
      squareUpRight.style.backgroundColor !== "rgb(124, 62, 247)"
    ) {
      squareUpRight.style.backgroundColor = "rgb(161, 128, 224)";
    }
    if (
      squareUpLeft !== null &&
      squareUpLeft.style.backgroundColor !== "rgb(124, 62, 247)"
    ) {
      squareUpLeft.style.backgroundColor = "rgb(161, 128, 224)";
    }
    if (
      squareDownLeft !== null &&
      squareDownLeft.style.backgroundColor !== "rgb(124, 62, 247)"
    ) {
      squareDownLeft.style.backgroundColor = "rgb(161, 128, 224)";
    }
  }

  if (currentTurn == playerOneUsername) {
    currentTurn = playerTwoUsername;
  } else {
    currentTurn = playerOneUsername;
  }
  checkMoves();
  updateStats();
}

function checkMoves() {
  let movesAvailable = false;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].style.backgroundColor == "") movesAvailable = true;
  }
  if (!movesAvailable) {
    let winner =
      currentTurn == playerOneUsername ? playerTwoUsername : playerOneUsername;
    winner == playerOneUsername ? playerOneWon++ : playerTwoWon++;
    document.querySelector("#winner").textContent = winner;
    document.querySelector(".end-screen").style.display = "flex";
  }
}

let radioButtons = Array.from(document.querySelectorAll("input[type=radio]"));
radioButtons.forEach((r) => r.addEventListener("change", RadioCheck));
function RadioCheck() {
  let radio = document.getElementById("option-4");
  let gameSize = document.getElementById("game-size");
  if (radio.checked) {
    gameSize.style.display = "flex";
  } else {
    gameSize.style.display = "none";
  }

  let radioBot = document.getElementById("option-6");
  let playerTwoField = document.getElementById("player-two-show");
  let playerTwoLabel = document.getElementById("player-two-label");
  if (radioBot.checked) {
    playerTwoField.style.display = "none";
    playerTwoLabel.style.display = "none";
  } else {
    playerTwoField.style.display = "block";
    playerTwoLabel.style.display = "block";
  }
}

let gameForm = document.querySelector(".game-settings");
gameForm.addEventListener("submit", startGame);

let sizeOptions = {
  "option-1": [6, 6],
  "option-2": [9, 9],
  "option-3": [12, 12],
};

function startGame(e) {
  e.preventDefault();
  let formData = new FormData(container[row][col]);
  let {
    ["player-one"]: playerOne,
    ["player-two"]: playerTwo,
    ["size-x"]: sizeX,
    ["size-y"]: sizeY,
  } = Object.fromEntries(formData.entries());
  let size = document.querySelector("input[name=select]:checked");
  let gameType = document.querySelector("input[name=select2]:checked");
  if (size.id != "option-4") {
    console.log(size.id);
    [sizeX, sizeY] = sizeOptions[size.id];
  } else {
    if (sizeX == "" || sizeY == "")
      return alert("Please fill in the width and height.");
  }
  width = sizeX;
  height = sizeY;
  playerOneUsername = playerOne;
  playerTwoUsername = playerTwo;
  document.querySelector(".start-menu").style.display = "none";
  document.querySelector(".game-container").style.display = "grid";
  document.querySelector(".game-stats").style.display = "flex";
  currentTurn = playerOneUsername;
  AddSquares();
  updateStats();
  startTimer();
}

function updateStats() {
  document.querySelector("#player-one-stat").textContent = playerOneUsername;
  document.querySelector("#player-two-stat").textContent = playerTwoUsername;
  document.querySelector("#player-one-games").textContent = playerOneWon;
  document.querySelector("#player-two-games").textContent = playerTwoWon;
  document.querySelector("#players-turn").textContent = currentTurn;
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime - minutes * 60;
  document.querySelector("#game-time").textContent = `${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
}

function startTimer() {
  setInterval(() => {
    currentTime++;
    updateStats();
  }, 1000);
}

function resetGame() {
  document.querySelector(".start-menu").style.display = "flex";
  document.querySelector(".game-container").innerHTML = "";
  document.querySelector(".game-container").style.display = "none";
  document.querySelector(".game-stats").style.display = "none";
  document.querySelector(".end-screen").style.display = "none";
}

document.getElementById("rematch").addEventListener("click", () => {
  document.querySelector(".game-container").innerHTML = "";
  document.querySelector(".end-screen").style.display = "none";
  AddSquares();
});

document.getElementById("menu").addEventListener("click", resetGame);
