import handleBoardClick from "./index.js";

const boardRegions = document.querySelectorAll("#tableGameGrid li");
let vBoard = [];
let gameState = {
  turnPlayer: "",
};

function updateTitle() {
  const playerInput = document.getElementById(gameState.turnPlayer);
  document.getElementById("currentPlayer").innerText = playerInput.value;
}

export default function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameState.turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="currentPlayer"></span>';
  updateTitle();
  boardRegions.forEach(function (element) {
    element.classList.remove("winner");
    element.innerText = "";
    element.classList.add("cursor-pointer");
    element.addEventListener("click", handleBoardClick);
  });
}

export { vBoard, gameState, updateTitle };
