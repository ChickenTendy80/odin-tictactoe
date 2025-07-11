//Gameboard
function GameBoard() {
    const size = 3;
    const board = [];

    for(let i = 0; i < size; i++){
        board[i] = [];
        for(let j = 0; j < size; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const selectCell = (row, column, player) => {
        /*
        if(board[row][column] != 0){
            console.log("Cell is already taken");
            return;
        }
        */
        board[row][column].addMark(player);
    }

    const printBoard = () => { 
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues); 
    }

    return {getBoard, selectCell, printBoard};
}



//Cell informaitons
// 0 is no token
// 1 for player 1
// 2 for player 2
function Cell(){
    let value = 0;
    let mark = "";

    const addMark = (player) => {
        value = player.token;
        mark = player.mark;
    }

    const getValue = () => value;

    const getMark = () => mark;

    return {addMark, getValue, getMark};
}

//Game Controller/Logic
function GameLogic(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = new GameBoard();
    let gameOver = false;

    const getGameOver = () => gameOver;

    const players = [
        {
            name: playerOneName,
            token: 1,
            mark: "O"
        },
        {
            name: playerTwoName,
            token: 2,
            mark: "X"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} placed a token on row ${row} and column ${column}`);
        board.selectCell(row, column, getActivePlayer());

        //Check winner
        //Rows
        if(
            board.getBoard()[0][0].getMark() != 0 &&
            board.getBoard()[0][0].getValue() == board.getBoard()[0][1].getValue() == board.getBoard()[0][0].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        } else if(
            board.getBoard()[1][0].getMark() != 0 &&
            board.getBoard()[1][0].getValue() == board.getBoard()[1][1].getValue() == board.getBoard()[1][2].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        } else if(
            board.getBoard()[2][0].getMark() != 0 &&
            board.getBoard()[2][0].getValue() == board.getBoard()[2][1].getValue() == board.getBoard()[2][2].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        }

        //Columns
        if(
            board.getBoard()[0][0].getMark() != 0 &&
            board.getBoard()[0][0].getValue() == board.getBoard()[1][0].getValue() == board.getBoard()[2][0].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        } else if(
            board.getBoard()[0][1].getMark() != 0 &&
            board.getBoard()[0][1].getValue() == board.getBoard()[1][1].getValue() == board.getBoard()[2][1].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        } else if(
            board.getBoard()[0][2].getMark() != 0 &&
            board.getBoard()[0][2].getValue() == board.getBoard()[1][2].getValue() == board.getBoard()[2][2].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        }

        //Diagonal
        if(
            board.getBoard()[0][0].getMark() != 0 &&
            board.getBoard()[0][0].getValue() == board.getBoard()[1][1].getValue() == board.getBoard()[2][2].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        } else if(
            board.getBoard()[0][2].getMark() != 0 &&
            board.getBoard()[0][2].getValue() == board.getBoard()[1][1].getValue() == board.getBoard()[2][0].getValue()
        ){
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
        }

        switchPlayerTurn();
        printNewRound();
    }

    //Initial Play Round
    printNewRound();

    return{playRound, getActivePlayer, getGameOver};
}

const game = GameLogic();

//player action test

//player 1
game.playRound(1,1);

//player 2
game.playRound(0,0);

//player 1
game.playRound(2,1);

//player 2
game.playRound(1,0);

//player 1
game.playRound(0,1);

console.log(game.getGameOver());

//UI