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
    for (let j = 1; j <= width; j++) {
      let child = document.createElement("div");
      child.setAttribute("class", "squares");
      child.setAttribute("id", i.toString() + " " + j.toString());
      container.appendChild(child);
    }
  }
  squares = Array.from(document.getElementsByClassName("squares"));
  container.style.width = "600px";
  containerParameters = container.getBoundingClientRect();
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.width =
      (containerParameters.width / width).toString() + "px";
  }
  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  //   } else {
  //     container.style.height = "600px";
  //     containerParameters = container.getBoundingClientRect();
  //     for (let i = 0; i < squares.length; i++) {
  //       squares[i].style.height =
  //         (containerParameters.height / height).toString() + "px";
  //     }
  //     container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
  //   }
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", Move);
  }
}
function Move(e) {
  if (
    e.target.style.backgroundColor === "rgb(161, 128, 224)" ||
    e.target.style.backgroundColor === "rgb(124, 62, 247)"
  )
    return;
  e.target.style.backgroundColor = "rgb(124, 62, 247)";
  e.target.innerHTML = "<i class='fa-solid fa-chess-queen'></i>";
  let id = e.target.id;
  let moveRow = Number(id.split(" ")[0]);
  let moveCol = Number(id.split(" ")[1]);
  for (let i = 1; i <= height; i++) {
    // Horizontaly
    let square = document.getElementById(i.toString() + " " + id.split(" ")[1]);
    if (square.style.backgroundColor === "") {
      square.style.backgroundColor = "rgb(161, 128, 224)";
    }
  }
  for (let i = 1; i <= width; i++) {
    // Verticaly
    let square = document.getElementById(id.split(" ")[0] + " " + i.toString());
    if (square.style.backgroundColor === "") {
      square.style.backgroundColor = "rgb(161, 128, 224)";
    }
  }

  for (let i = 0; i < squares.length; i++) {
    // Diagonally
    let downRight = (moveRow + i).toString() + " " + (moveCol + i).toString();
    let upRight = (moveRow - i).toString() + " " + (moveCol + i).toString();
    let upLeft = (moveRow - i).toString() + " " + (moveCol - i).toString();
    let downLeft = (moveRow + i).toString() + " " + (moveCol - i).toString();

    let squareDownRight = document.getElementById(downRight);
    let squareUpRight = document.getElementById(upRight);
    let squareUpLeft = document.getElementById(upLeft);
    let squareDownLeft = document.getElementById(downLeft);

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
    alert(winner + " won!");
    resetGame();
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
}

let gameForm = document.querySelector(".game-settings");
gameForm.addEventListener("submit", startGame);

let sizeOptions = {
  "option-1": [3, 3],
  "option-2": [6, 6],
  "option-3": [9, 9],
};

function startGame(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let {
    ["player-one"]: playerOne,
    ["player-two"]: playerTwo,
    ["size-x"]: sizeX,
    ["size-y"]: sizeY,
  } = Object.fromEntries(formData.entries());
  let size = document.querySelector("input[type=radio]:checked");
  if (size.id != "option-4") {
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
}
