currentPlayerSymbol = "x";
squareValues = ["", "", "", "", "", "", "", "", ""];
//add song
//https://www.youtube.com/watch?v=TW__gFpKR1E

const winnerChecker = function (array, playa) {
  let banner = document.getElementById("game-status");

  let rows = checkRow(array, playa);
  let cols = checkCols(array, playa);
  let diag = checkDiag(array, playa);

  if (rows || cols || diag) {
    banner.innerText = `Winner : ${playa}`;
    return true;
  } else if (array.join("").length === 9) {
    banner.innerText = `Winner : None`;
    return true;
  } else {
    return false;
  }
};

const checkRow = function (array, playa) {
  //checking all rows for a winna
  let won = false;
  playa = playa + playa + playa;
  if (
    squareValues.slice(0, 3).join("") === playa ||
    squareValues.slice(3, 6).join("") === playa ||
    squareValues.slice(6).join("") === playa
  ) {
    won = true;
  }
  return won;
};
const checkCols = function (array, playa) {
  //checking all cols for a winer
  for (let i = 0; i < 3; i++) {
    if (
      array[i + 0] === array[i + 3] &&
      array[i + 3] === array[i + 6] &&
      array[i + 0] === playa
    ) {
      return true;
    }
  }
  return false;
};

const checkDiag = function (array, playa) {
  //checks all diag
  if (
    (array[0] === array[4] && array[4] === array[8] && array[0] === playa) ||
    (array[2] === array[4] && array[4] === array[6] && array[2] === playa)
  ) {
    return true;
  }
  return false;
};

const resetGame = function () {
  const resetButton = document.querySelector(".actions button");
  resetButton.addEventListener("click", () => {
    squareValues = ["", "", "", "", "", "", "", "", ""];
    let imgs = document
      .querySelectorAll("img")
      .forEach((img) => (img.src = ""));
    // console.log(imgs)
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("tic-tac-toe-board");
  let won = false;
  resetGame();
  grid.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] === "square") {
      let hitSquare = Number.parseInt(e.target.id.split("-")[1]);
      const butthead = document.createElement("img");

      //if move is available
      if (!squareValues[hitSquare] && !won) {
        //fills array with player's move
        squareValues[hitSquare] = currentPlayerSymbol;
        // check who is playing
        if (currentPlayerSymbol === "x") {
          butthead.src = "./player-x.svg";
        } else {
          butthead.src = "./player-o.svg";
        }
        won = winnerChecker(squareValues, currentPlayerSymbol);
        //switch player
        currentPlayerSymbol = currentPlayerSymbol === "x" ? "o" : "x";
      }
      //add svg to the grid
      e.target.appendChild(butthead);
    }
  });
});
