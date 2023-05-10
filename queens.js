let test1 = 6;
let test2 = 6;
let container = document.getElementsByClassName("game-container")[0];
let containerParameters = container.getBoundingClientRect();
let squares;
function AddSquares() {
  for (let i = 1; i <= test2; i++) {
    for (let j = 1; j <= test1; j++) {
      let child = document.createElement("div");
      child.setAttribute("class", "squares");
      child.setAttribute("id", i.toString() + " " + j.toString());
      container.appendChild(child);
      console.log("vlizam");
    }
  }
  squares = Array.from(document.getElementsByClassName("squares"));
  container.style.width = "600px";
  containerParameters = container.getBoundingClientRect();
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.width =
      (containerParameters.width / test1).toString() + "px";
  }
  container.style.gridTemplateColumns = `repeat(${test1}, 1fr)`;
  //   } else {
  //     container.style.height = "600px";
  //     containerParameters = container.getBoundingClientRect();
  //     for (let i = 0; i < squares.length; i++) {
  //       squares[i].style.height =
  //         (containerParameters.height / test2).toString() + "px";
  //     }
  //     container.style.gridTemplateRows = `repeat(${test2}, 1fr)`;
  //   }
  console.log(squares);
  for (let i = 0; i < squares.length; i++) {
    console.log(squares[i]);
    squares[i].addEventListener("click", Move);
  }
}
function Move(e) {
  if (
    e.target.style.backgroundColor === "yellow" ||
    e.target.style.backgroundColor === "pink"
  )
    return;
  console.log("vlqaam");
  e.target.style.backgroundColor = "pink";
  let id = e.target.id;
  let id1 = Number(id.split(" ")[0]);
  let id2 = Number(id.split(" ")[1]);
  console.log(id);
  for (let i = 1; i <= test2; i++) {
    console.log(i.toString() + " " + id.split(" ")[1]);
    let square = document.getElementById(i.toString() + " " + id.split(" ")[1]);
    console.log(square);
    if (square.style.backgroundColor === "") {
      square.style.backgroundColor = "yellow";
    }
  }
  for (let i = 1; i <= test1; i++) {
    console.log(i.toString() + " " + id.split(" ")[1]);
    let square = document.getElementById(id.split(" ")[0] + " " + i.toString());
    console.log(square);
    if (square.style.backgroundColor === "") {
      square.style.backgroundColor = "yellow";
    }
  }

  // for (let i = 1; i <= test1; i++) {
  //   for (let j = 1; j < test2; j++) {
  //     let square = document.getElementById(i.toString() + " " + j.toString());
  //     if (square.id) {
  //     }
  //   }
  // }

  for (let i = 0; i < squares.length; i++) {
    let idto = (id1 + i).toString() + " " + (id2 + i).toString();
    let square = document.getElementById(idto);
    if (square !== null && square.style.backgroundColor !== "pink") {
      square.style.backgroundColor = "yellow";
    }
  }
  for (let i = 0; i < squares.length; i++) {
    let idto = (id1 - i).toString() + " " + (id2 + i).toString();
    let square = document.getElementById(idto);
    if (square !== null && square.style.backgroundColor !== "pink") {
      square.style.backgroundColor = "yellow";
    }
  }
  for (let i = 0; i < squares.length; i++) {
    let idto = (id1 - i).toString() + " " + (id2 - i).toString();
    let square = document.getElementById(idto);
    if (square !== null && square.style.backgroundColor !== "pink") {
      square.style.backgroundColor = "yellow";
    }
  }
  for (let i = 0; i < squares.length; i++) {
    let idto = (id1 + i).toString() + " " + (id2 - i).toString();
    let square = document.getElementById(idto);
    if (square !== null && square.style.backgroundColor !== "pink") {
      square.style.backgroundColor = "yellow";
    }
  }
}

AddSquares();

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
