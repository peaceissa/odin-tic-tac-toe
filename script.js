// gameBoard module
const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const isBoardFull = () => board.every((cell) => cell !== "");

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getBoard, isBoardFull, resetBoard };
})();

// Player factory function
const Player = (name, symbol) => {
    return { name, symbol };
};

// displayController module
const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const resultDisplay = document.getElementById("result");

    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            const cellId = e.target.getAttribute("data-cell-id");
            if (gameBoard.getBoard()[cellId] === "" && !isGameOver()) {
                const currentPlayer = getCurrentPlayer();
                gameBoard.getBoard()[cellId] = currentPlayer.symbol;
                e.target.textContent = currentPlayer.symbol;
                if (checkWin(currentPlayer.symbol)) {
                    resultDisplay.textContent = `${currentPlayer.name} wins!`;
                } else if (gameBoard.isBoardFull()) {
                    resultDisplay.textContent = "It's a draw!";
                } else {
                    switchPlayer();
                }
            }
        });
    });

    const players = [Player("Player 1", "X"), Player("Player 2", "O")];
    let currentPlayerIndex = 0;

    const getCurrentPlayer = () => players[currentPlayerIndex];
    const switchPlayer = () => {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        resultDisplay.textContent = `Current Player: ${getCurrentPlayer().name}`;
    };

    const checkWin = (symbol) => {
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

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                gameBoard.getBoard()[a] === symbol &&
                gameBoard.getBoard()[b] === symbol &&
                gameBoard.getBoard()[c] === symbol
            ) {
                return true;
            }
        }
        return false;
    };

    const isGameOver = () => {
        return resultDisplay.textContent !== "Result: ";
    };

    return { getCurrentPlayer };
})();
const start = document.getElementById('btn');
start.addEventListener("click",function(){
    // Refresh the current page
location.reload();
});