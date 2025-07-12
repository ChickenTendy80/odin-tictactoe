<<<<<<< HEAD
let cells = document.querySelectorAll(".cell");
let restartGameButton = document.querySelector(".restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
=======
function Gameboard(){
    const board = [];

    for(let i = 0;i < 3; i++){
        board[i]=[];
        for(let j = 0; j < 3; j++){
            board[i].push(Cell());
        }
    }
>>>>>>> parent of 12273ea (Created basic logic/ trying to get winner logic to work in console first)

let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

<<<<<<< HEAD
cells.forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

restartGameButton.addEventListener("click", restartGame);

console.log("Game board created");

function cellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");
  console.log(`Cell clicked: ${index}`);

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const a = board[condition[0]];
    const b = board[condition[1]];
    const c = board[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
=======
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    const chooseCell = (row, column, player) => {

        console.log("Selected row: " + row + " column: " + column);
        board[row][column] = player;
    }

    return { getBoard, chooseCell, printBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };
>>>>>>> parent of 12273ea (Created basic logic/ trying to get winner logic to work in console first)

  if (roundWon) {
    gameActive = false;
    document.querySelector(
      ".player-turn"
    ).textContent = `Player ${currentPlayer} wins!`;
    return;
  }

<<<<<<< HEAD
  if (!board.includes("")) {
    gameActive = false;
    document.querySelector(".player-turn").textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.querySelector(
    ".player-turn"
  ).textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  document.querySelector(".player-turn").textContent = "Player X's turn";
}
=======
    return {addToken, getValue};
}

function GameController(
    playerOneName = "Player One", playerTwoName = "Player Two"
) {
    const board = Gameboard();
    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = acticePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log("${getActivePlayer().name}'s turn.");
    };

    const playRound = (row, column) => {
        console.log("Placing ${getActivePlayer().name}'s token into row ${row} and column ${column}...");
        board.chooseCell(row, column, getActivePlayer().token);

        /*Check win condition*/
        /*Check rows*/

        /*Check columns*/

        /*Check diagonal*/
        if(board.getBoard()[0][0] == board.getBoard()[1][1] &&
            board.getBoard()[1][1] == board.getBoard()[2][2] &&
            board.getBoard()[0][0] == board.getBoard()[2][2]
        ) {
            console.log("WIN");
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();
>>>>>>> parent of 12273ea (Created basic logic/ trying to get winner logic to work in console first)
