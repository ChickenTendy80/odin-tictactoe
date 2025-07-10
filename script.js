function Gameboard(){
    const board = [];

    for(let i = 0;i < 3; i++){
        board[i]=[];
        for(let j = 0; j < 3; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

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

    const getValue = () => value;

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
