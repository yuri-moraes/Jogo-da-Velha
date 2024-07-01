import initializeGame, { updateTitle, gameState, vBoard } from "./initGame.js";
import getWinRegions from "./getWinRegions.js";

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick);
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-move="' + region + '"]')
      .classList.add("winner");
  });
  const playerName = document.getElementById(gameState.turnPlayer).value;
  document.querySelector("h2").innerHTML = playerName + " venceu!";
}

export default function handleBoardClick(ev) {
  const li = ev.currentTarget;
  const region = li.dataset.move;
  const rowColumnPair = region.split(".");
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];
  if (gameState.turnPlayer === "player1") {
    li.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    li.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear();
  console.table(vBoard);
  disableRegion(li);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    gameState.turnPlayer =
      gameState.turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
  }
}
document.getElementById("restartBtn").addEventListener("click", initializeGame);
