const COLUMNS = 7;
const ROWS = 6;
const WINNING_NUMBER = 4;
export const TIME_PER_ROUND = 5;
export const plainBoard = new Array(COLUMNS).fill(0).map(() => new Array(ROWS).fill(0));

let coordinatesOfBall = {
  i: 0,
  j: 0,
};

export const insertBall = (state, action) => {
  const { rowIndex, activePlayer } = action.payload;

  coordinatesOfBall.i = rowIndex;

  const newBoard = [...state.board];
  const column = [...newBoard[rowIndex]];

  for (let i = 0; i < column.length; i++) {
    if (!column[i]) {
      column[i] = activePlayer;
      coordinatesOfBall.j = i;
      state.time = TIME_PER_ROUND;
      break;
    }
  }

  newBoard[rowIndex] = column;
  return newBoard;
};

export const checkWinner = (state, action) => {
  console.log(coordinatesOfBall);
  const { activePlayer } = action.payload;
  console.log(`activePlayer: ${activePlayer}`);
  const board = [...state.board];
  const numRows = board.length;
  const numColumns = board[0].length;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      //Sprawdź czy w tablicy jest kulka gracza
      if (board[i][j] === activePlayer) {
        //Jeśli tak to sprawdź czy sąsiadują z nią dwie kulki poziomo:
        if (
          j > 0 &&
          j < numColumns - 1 &&
          board[i][j - 1] === activePlayer &&
          board[i][j + 1] === activePlayer
        ) {
          let count = 0;
          for (let k = 0; k < numColumns; k++) {
            if (board[i][k] === activePlayer) count++;
            else count = 0;
            if (count === WINNING_NUMBER) {
              console.log(`GRACZ ${activePlayer} WYGRYWA 4 KULKI SĄSIDUJĄ PIONOWO`);
              return activePlayer;
            }
          }
        }
        //Sprawdź czy sąsaidują z nią dwie kulki pionowo:
        else if (
          i > 0 &&
          i < numRows - 1 &&
          board[i - 1][j] === activePlayer &&
          board[i + 1][j] === activePlayer
        ) {
          let count = 0;
          for (let k = 0; k < numRows; k++) {
            if (board[k][j] === activePlayer) count++;
            else count = 0;
            if (count === WINNING_NUMBER) {
              console.log(`GRACZ ${activePlayer} WYGRYWA 4 KULKI SĄSIDUJĄ POZIOMO`);
              return activePlayer;
            }
          }
        }
        //Sprawdź czy sąsiadują z nią dwie kulki na skos:
        else if (i > 0 && i < numRows - 1 && j > 0 && j < numColumns - 1) {
          if (
            (board[i - 1][j - 1] === activePlayer && board[i + 1][j + 1] === activePlayer) ||
            (board[i - 1][j + 1] === activePlayer && board[i + 1][j - 1] === activePlayer)
          ) {
            return checkDiagonal(board, WINNING_NUMBER, activePlayer);
          }
        }
      }
    }
  }
  return null;
};

function checkDiagonal(arr, x, player) {
  const rows = arr.length;
  const cols = arr[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Check diagonally up-right
      let count = 0;
      for (let i = 0; i <= x; i++) {
        if (row - i >= 0 && col - i < cols && arr[row - i][col - i] === player) {
          count++;
        } else {
          count = 0;
        }
      }
      if (count === x) {
        return player;
      }

      // Check diagonally down-right
      count = 0;
      for (let i = 0; i <= x; i++) {
        if (row + i < rows && col + i < cols && arr[row + i][col + i] === player) {
          count++;
        } else {
          count = 0;
        }
      }
      if (count === x) {
        return player;
      }
    }
  }
  return null;
}
