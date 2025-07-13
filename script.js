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
    if(board[row][column].getMark() !== ""){
      console.log("Cell is already taken");
      return;
    }

    return board[row][column].addMark(mark);
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

  const getActiveMark = () => activePlayer.mark;
  
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  }

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} placed a token on row ${row} and column ${column}`);
    board.selectCell(row, column, ""+getActivePlayer().mark);

    if(
      getActivePlayer().mark === board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() === board.getBoard()[0][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("row 1");
      gameOver = true;
    } else if(
      getActivePlayer().mark === board.getBoard()[1][0].getMark() === board.getBoard()[1][1].getMark() === board.getBoard()[1][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("row 2");
      gameOver = true;
    } else if(
      getActivePlayer().mark === board.getBoard()[2][0].getMark() === board.getBoard()[2][1].getMark() === board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("row 3");
      gameOver = true;
    }

    if(
      getActivePlayer().mark === board.getBoard()[0][0].getMark() === board.getBoard()[1][0].getMark() === board.getBoard()[2][0].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("column 1");
      gameOver = true;
    } else if(
      getActivePlayer().mark === board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() === board.getBoard()[2][1].getMark()   
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("column 2");
      gameOver = true;
    } else if(
      getActivePlayer().mark === board.getBoard()[0][2].getMark() === board.getBoard()[1][2].getMark() === board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("column 3");
      gameOver = true;
    }

    if(
      getActivePlayer().mark === board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() === board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("diagonal 1");
      gameOver = true;
    } else if(
      getActivePlayer().mark === board.getBoard()[0][2].getMark() == board.getBoard()[1][1].getMark() === board.getBoard()[2][0].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("diagonal 1");
      gameOver = true;
    }

    if(board.getBoard().flat().every(element => element.getMark() !== "")){
      console.log(`${getActivePlayer().name} won!`);
      gameOver = true;
    }

    switchPlayer();
    printNewRound();
  }

  printNewRound();

  return{getActivePlayer, getActiveMark, playRound, getGameOver};
}

//UI
const ScreenController = (function() {
  const game = GameLogic();

  const gameCells = document.querySelectorAll(".cell");
  const resetButton = document.querySelector(".restart-btn");
  const playerTurn = document.querySelector(".player-turn");

  const cellClick = (event) => {
    const cell = event.target;
    const rowIndex = cell.getAttribute("data-row");
    const columnIndex = cell.getAttribute("data-column");
    console.log(`Cell clicked at row: ${rowIndex} and column: ${columnIndex}`);
    game.playRound(rowIndex, columnIndex);
    cell.textContent = game.getActiveMark();

    if(game.getGameOver()){
      console.log("END");
    }

  }

  const restartGame = () => {
    const board = new GameBoard();
  }

  gameCells.forEach((cell) => {
    cell.addEventListener("click", cellClick);
  });

  resetButton.addEventListener("click", restartGame);


  return {};

})();