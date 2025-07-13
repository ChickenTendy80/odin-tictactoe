//GameBoard----------------------------------------------------------------------------------------------------------------------------------------
function GameBoard(){
  const size = 3;
  const board = [];

  for(let i = 0; i < size; i++){
    board[i] = [];
    for(let j = 0; j < size; j++){
      board[i].push(Cell());
      board[i][j].resetMark();
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    let tempBoard = [];
    for(let i = 0; i < size; i++){
      tempBoard[i] = [];
      for(let j = 0; j < size; j++){
        tempBoard[i].push(board[i][j].getMark());
      }
    }
    console.log(tempBoard);
  };

  const selectCell = (row, column, mark) => {
    console.log("Selected row: " + row + " column: " + column);
    if(board[row][column].getMark() !== ""){
      console.log("Cell is already taken");
      return false;
    }

    return board[row][column].addMark(mark);
  }

  return {getBoard, printBoard, selectCell};
}

//Cell----------------------------------------------------------------------------------------------------------------------------------------
function Cell() {
  let mark = "";

  const addMark = (playerMark) => {
    mark = playerMark;
  }

  const getMark = () => mark;

  const resetMark = () => mark = "";

  return {addMark, getMark, resetMark};
}

//GameLogic-----------------------------------------------------------------------------------------------------
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

  const getActiveName = () => activePlayer.name;

  const getActiveMark = () => activePlayer.mark;
  
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  }

  const isTakenCell = (row, column) => {
    return board.getBoard()[row][column].getMark() !== "";
  }

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} placed a ${getActiveMark()} on row ${row} and column ${column}`);
    console.log(getActiveMark());
    board.selectCell(row, column, getActiveMark());

    if(
      getActiveMark() === board.getBoard()[0][0].getMark() &&
      board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() &&
      board.getBoard()[0][1].getMark() === board.getBoard()[0][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("row 1");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    } else if(
      getActivePlayer().mark === board.getBoard()[1][0].getMark() &&
      board.getBoard()[1][0].getMark() === board.getBoard()[1][1].getMark() &&
      board.getBoard()[1][1].getMark() === board.getBoard()[1][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("row 2");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    } else if(
      getActivePlayer().mark === board.getBoard()[2][0].getMark() &&
      board.getBoard()[2][0].getMark() === board.getBoard()[2][1].getMark() &&
      board.getBoard()[2][1].getMark() === board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("row 3");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    }

    if(
      getActivePlayer().mark === board.getBoard()[0][0].getMark() &&
      board.getBoard()[0][0].getMark() === board.getBoard()[1][0].getMark() &&
      board.getBoard()[1][0].getMark() === board.getBoard()[2][0].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("column 1");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    } else if(
      getActivePlayer().mark === board.getBoard()[0][1].getMark() &&
      board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() &&
      board.getBoard()[1][1].getMark() === board.getBoard()[2][1].getMark()   
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("column 2");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    } else if(
      getActivePlayer().mark === board.getBoard()[0][2].getMark() &&
      board.getBoard()[0][2].getMark() === board.getBoard()[1][2].getMark() &&
      board.getBoard()[1][2].getMark() === board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("column 3");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    }

    if(
      getActivePlayer().mark === board.getBoard()[0][0].getMark() &&
      board.getBoard()[0][0].getMark() === board.getBoard()[1][1].getMark() &&
      board.getBoard()[1][1].getMark() === board.getBoard()[2][2].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("diagonal 1");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    } else if(
      getActivePlayer().mark === board.getBoard()[0][2].getMark() &&
      board.getBoard()[0][2].getMark() == board.getBoard()[1][1].getMark() &&
      board.getBoard()[1][1].getMark() === board.getBoard()[2][0].getMark()
    ) {
      console.log(`${getActivePlayer().name} won!`);
      console.log("diagonal 2");
      gameOver = true;
      return `${getActivePlayer().name} won!`;
    }

    if(board.getBoard().flat().every(element => element.getMark() !== "")){
      console.log("It's a tie!");
      gameOver = true;
      return "It's a tie!";
    }

    printNewRound();
    switchPlayer();
  }

  printNewRound();

  return{getActivePlayer, getActiveMark, getActiveName, playRound, getGameOver, isTakenCell};
}

//UI----------------------------------------------------------------------------------------------------------------------------------------
const ScreenController = (function() {
  const game = GameLogic();

  const gameCells = document.querySelectorAll(".cell");
  const resetButton = document.querySelector(".restart-btn");
  const playerTurn = document.querySelector(".player-turn");

  let winText = "";

  const cellClick = (event) => {
    const cell = event.target;
    const rowIndex = cell.getAttribute("data-row");
    const columnIndex = cell.getAttribute("data-column");
    console.log(`Cell clicked at row: ${rowIndex} and column: ${columnIndex}`);
    //console.log(game.isTakenCell(rowIndex,columnIndex));
    if(!game.isTakenCell(rowIndex,columnIndex)){
      cell.textContent = game.getActiveMark();
      winText = game.playRound(rowIndex, columnIndex);
    }

    if(game.getGameOver()){
      console.log("END");
      playerTurn.textContent = winText;
      return;
    }

    playerTurn.textContent = game.getActiveName();
  }

  const restartGame = () => {
    console.log("Resetted");
    board = new GameLogic();
    playerTurn.textContent = game.getActiveName();
    gameCells.forEach((cell) => {
      cell.textContent = "";
      //the marks arne't resetting properly for some reason :/
    });
  }

  gameCells.forEach((cell) => {
    cell.addEventListener("click", cellClick);
  });

  resetButton.addEventListener("click", restartGame);


  return {};

})();