const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");
    if (board[index] !== "" || !isGameActive) return;
    board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "It's a tie!";
    isGameActive = false;
    return;
  }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);