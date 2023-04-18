const editPlayerOne = document.getElementById("edit-1");
const editPlayerTwo = document.getElementById("edit-2");
const editCancel = document.getElementById("edit-cancel");
const FormEl = document.querySelector("#edit-submit");
const backdrop = document.getElementById("backdrop");
const startGame = document.getElementById("start-game");
const modal = document.getElementById("overlay");
const error = document.getElementById("errors");
const Name1 = document.getElementById("p1");
const Name2 = document.getElementById("p2");
const gameArea = document.getElementById("active-game");
const gameOver = document.getElementById("game-over");
const activePlayerName = document.getElementById("active-player");
// const gameField = document.querySelectorAll('#game-board li')
const Field = document.getElementById("game-board");
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let edittedPlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "O",
  },
  {
    name: "",
    symbol: "X",
  },
];

function playerConfig(event) {
  edittedPlayer = +event.target.dataset.playerid;
  backdrop.style.display = "block";
  modal.style.display = "block";
  console.log(edittedPlayer);
}
function closeConfig() {
  backdrop.style.display = "none";
  modal.style.display = "none";
  error.textContent = "";
}
function saveConfig(event) {
  event.preventDefault();
  let formData = event.target.form.querySelector('input[name="playername"]');
  let name = formData.value.trim();
  if (!name) {
    error.textContent = "Pleass enter a valid name";
    error.style.color = "red";
    return;
  }
  if (edittedPlayer === 1) {
    Name1.textContent = name;
    players[0].name = name;
    formData.value = "";
    closeConfig();
  } else {
    Name2.textContent = name;
    players[1].name = name;
    formData.value = "";
    closeConfig();
  }
}

function resetGame() {
  activePlayer = 0;
  gameIsOver = false;
  currentRound = 1;
  gameOver.firstElementChild.innerHTML =
    '<h2>You won <span id="winner">Name</span></h2>';
  gameOver.style.display = "none";
  let fieldIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const fieldItem = Field.children[fieldIndex];
      console.dir(fieldItem);
      fieldItem.innerText = "";
      fieldItem.classList.remove("disabled");
      fieldIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert(`Please enter valid player names`);
    return;
  }
  resetGame();
  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

editPlayerOne.addEventListener("click", playerConfig);
editPlayerTwo.addEventListener("click", playerConfig);
editCancel.addEventListener("click", closeConfig);
FormEl.addEventListener("click", saveConfig);
backdrop.addEventListener("click", closeConfig);
startGame.addEventListener("click", startNewGame);
// for (field of gameField) {
// field.addEventListener('click', selectGameField) ;
// }
Field.addEventListener("click", selectGameField);
let activePlayer = 0;

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver === true) {
    return;
  }
  const selectedField = event.target;

  const selectedCol = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    return;
  }

  selectedField.innerText = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedCol] = activePlayer + 1;

  const winnerId = checkGameOver();

  if (winnerId !== 0) {
    // console.log(winnerId);

    endGamePlay(winnerId);
  }

  currentRound++;

  switchPlayer();
}

function checkGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGamePlay(id) {
  gameIsOver = true;
  gameOver.style.display = "block";

  if (id > 0) {
    const winnerName = players[id - 1].name;
    console.log(winnerName);
    const bb = (document.getElementById("winner").textContent = winnerName);
    // gameOver.firstChildElement.firstChildElement.textContent = winnerName;
  } else {
    gameOver.firstElementChild.textContent = "The Game is Draw";
  }
}
