const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const messageDisplay = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle player clicks
function handleCellClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);
    
    if (gameState[index] !== '' || !gameActive) {
        return;
    }
    
    updateCell(cell, index);
    checkResult();
}

// Update cell and game state
function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check for winning conditions
function checkResult() {
    let roundWon = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        messageDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    if (!gameState.includes('')) {
        messageDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Restart the game
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', restartGame);
