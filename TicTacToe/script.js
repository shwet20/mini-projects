// Function to create and style the Tic-Tac-Toe game
function createTicTacToeGame() {
    // Create the main wrapper container for the game and button
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.marginTop = '50px';
    document.body.appendChild(wrapper);

    // Create the heading
    const heading = document.createElement('h1');
    heading.innerText = 'Tic-Tac-Toe';
    heading.style.fontFamily = 'Arial, sans-serif';
    heading.style.marginBottom = '20px';
    wrapper.appendChild(heading);

    // Create the game container
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.height = '300px';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    container.style.gridTemplateRows = 'repeat(3, 1fr)';
    container.style.gap = '5px';
    container.style.padding = '10px';
    container.style.border = '2px solid #000';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    wrapper.appendChild(container);

    // Create the cells
    const cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.style.width = '100%';
        cell.style.height = '100%';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.fontSize = '2rem';
        cell.style.cursor = 'pointer';
        cell.style.border = '1px solid #ccc';
        cell.style.backgroundColor = '#fff';
        cell.addEventListener('click', () => handleCellClick(cell, i));
        container.appendChild(cell);
        cells.push(cell);
    }

    let currentPlayer = 'X';
    let gameActive = true;
    const gameState = Array(9).fill(null);

    // Function to handle cell clicks
    function handleCellClick(cell, index) {
        if (!gameActive || gameState[index]) return;

        gameState[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';

        if (checkWinner()) {
            gameActive = false;
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                clearBoard();
            }, 10);
        } else if (!gameState.includes(null)) {
            gameActive = false;
            setTimeout(() => {
                alert('It\'s a draw!');
                clearBoard();
            }, 10);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    // Function to create and style the Clear button
    function createClearButton() {
        const clearButton = document.createElement('button');
        clearButton.innerText = 'Restart';
        clearButton.style.marginTop = '20px';
        clearButton.style.padding = '10px 20px';
        clearButton.style.fontSize = '16px';
        clearButton.style.cursor = 'pointer';
        clearButton.style.borderRadius = '5px';
        clearButton.style.border = '1px solid black';
        clearButton.style.backgroundColor = 'white';
        clearButton.style.color = 'black';

        // Add hover effect
        clearButton.addEventListener('mouseenter', () => {
            clearButton.style.backgroundColor = 'gray';
            clearButton.style.color = 'white';
        });
        clearButton.addEventListener('mouseleave', () => {
            clearButton.style.backgroundColor = 'white';
            clearButton.style.color = 'black';
        });

        clearButton.addEventListener('click', clearBoard);
        wrapper.appendChild(clearButton);
    }

    // Function to clear the game board
    function clearBoard() {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill(null);
        cells.forEach(cell => {
            cell.innerText = '';
            cell.style.color = 'black';
        });
    }

    createClearButton();
}

// Initialize the Tic-Tac-Toe game
createTicTacToeGame();
