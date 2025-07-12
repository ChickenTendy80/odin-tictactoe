function GameBoard(){
  const size = 3;
  const board = [];

  for(let i = 0; i < size; i++){
    board[i] = [];
    for(let j = 0; j < size; j++){
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const printBoard = () => console.log(board);

  const selectCell = (row, column, mark) => {
    console.log("Selected row: " + row + " column: " + column);
    if(board[row][column] !== ""){
      console.log("Cell is already taken");
      return;
    }

    board[row][column].addMark(mark);
  }

  return {getBoard, printBoard, selectCell};
}

function Cell() {
  let mark = "";

  const addMark = (playerMark) => {
    mark = playerMark;
  }

  const getMark = () => mark;

  return {addMark, getMark};
}

function GameLogic(
  playerOneName = "Player 1",
  playerTwoName = "Player 2"
){
  const board = new GameBoard();
  let gameOver = false;

  const getGameOver = () => gameOver;

  const player = [
    {
      name: playerOneName,
      mark: "O"
    },
    {
      name: playerTwoName,
      mark: "X"
    }
  ];

  let activePlayer = player[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  }

  const getActivePlayer = () => activePlayer;
  
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer()}'s turn`);
  }

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} placed a token on row ${row} and column ${column}`);
    console.log(getActivePlayer().mark);
    board.selectCell(row, column, ""+getActivePlayer().mark);

    if(
      board.getBoard()[0][0].getMark() !== "" && board.getBoard()[0][1].getMark() !== "" && board.getBoard()[0][2].getMark() !== "" &&
      board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() === board.getBoard()[0][2].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    } else if(
      board.getBoard()[1][0].getMark() !== "" && board.getBoard()[1][1].getMark() !== "" && board.getBoard()[1][2].getMark() !== "" &&
      board.getBoard()[1][0].getMark() == board.getBoard()[1][1].getMark() == board.getBoard()[1][2].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    } else if(
      board.getBoard()[2][0].getMark() !== "" && board.getBoard()[2][1].getMark() !== "" && board.getBoard()[2][2].getMark() !== "" &&
      board.getBoard()[2][0].getMark() == board.getBoard()[2][1].getMark() == board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    }

    if(
      board.getBoard()[0][0].getMark() !== "" && board.getBoard()[1][0].getMark() !== "" && board.getBoard()[2][0].getMark() !== "" &&
      board.getBoard()[0][0].getMark() == board.getBoard()[1][0].getMark() == board.getBoard()[2][0].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    } else if(
      board.getBoard()[0][1].getMark() !== "" && board.getBoard()[1][1].getMark() !== "" && board.getBoard()[2][1].getMark() !== "" &&
      board.getBoard()[0][1].getMark() == board.getBoard()[1][1].getMark() == board.getBoard()[2][1].getMark()   
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    } else if(
      board.getBoard()[0][2].getMark() !== "" && board.getBoard()[1][2].getMark() !== "" && board.getBoard()[2][2].getMark() !== "" &&
      board.getBoard()[0][2].getMark() == board.getBoard()[1][2].getMark() == board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    }

    if(
      board.getBoard()[0][0].getMark() !== "" && board.getBoard()[1][1].getMark() !== "" && board.getBoard()[2][2].getMark() !== "" &&
      board.getBoard()[0][1].getMark() == board.getBoard()[1][1].getMark() == board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    } else if(
      board.getBoard()[0][2].getMark() !== "" && board.getBoard()[1][1].getMark() !== "" && board.getBoard()[2][0].getMark() !== "" &&
      board.getBoard()[0][2].getMark() == board.getBoard()[1][1].getMark() == board.getBoard()[2][0].getMark()
    ) {
      console.log(`${getActivePlayer()} won!`);
      gameOver = true;
    }

    if(board.getBoard().flat().every(element => element.getMark() !== "")){
      console.log("It's a tie!");
      gameOver = true;
    }

    switchPlayer();
    printNewRound();
  }

  printNewRound();

  return{getActivePlayer, playRound, getGameOver};
}

const game = GameLogic();

game.playRound(1,1);
game.playRound(0,0);
game.playRound(2,1);
game.playRound(1,0);
game.playRound(0,1);
console.log(game.getGameOver());

