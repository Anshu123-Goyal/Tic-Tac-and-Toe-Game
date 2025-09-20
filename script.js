// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetForm = document.getElementById('resetForm');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `Player ${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame(e) {
  e.preventDefault();
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetForm.addEventListener('submit', resetGame);

// Initial status
statusText.textContent = `Player ${currentPlayer}'s turn`;
