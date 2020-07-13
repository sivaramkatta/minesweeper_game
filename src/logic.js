import { difficulty_obj } from "./constants";

export function boardSetup(n, difficulty) {
  let board = setEmptyBoard(n);
  setBombs(difficulty, board, n);
  setNumbers(board);
  return board;
}

function setEmptyBoard(n) {
  let arr = new Array(n);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(n);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = {
        value: null,
        open: false,
        flagged: false,
        wrongFlagged: false
      };
    }
  }

  return arr;
}

function setBombs(level = "EASY", board, n) {
  let bombs_no = difficulty_obj(n)[level];
  let repeated_arr = [];
  while (bombs_no > 0) {
    let random_row = Math.floor(Math.random() * n);
    let random_column = Math.floor(Math.random() * n);
    const string = `${random_row}&${random_column}`;
    if (!repeated_arr.includes(string)) {
      repeated_arr.push(string);
      board[random_row][random_column].value = -1;
      bombs_no--;
    }
  }
}

function setNumbers(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].value !== -1) {
        board[i][j].value =
          isValidTile(i - 1, j, board) +
          isValidTile(i + 1, j, board) +
          isValidTile(i, j - 1, board) +
          isValidTile(i, j + 1, board) +
          isValidTile(i + 1, j - 1, board) +
          isValidTile(i + 1, j + 1, board) +
          isValidTile(i - 1, j - 1, board) +
          isValidTile(i - 1, j + 1, board);
      }
    }
  }
}

export function gameEnded(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].open === false && board[i][j].flagged === false) {
        return false;
      }
    }
  }
  return true;
}

export function isBomb(row, column, board) {
  return board[row][column].value === -1;
}

function isValidTile(row, column, board) {
  return board[row] && board[row][column] ? isBomb(row, column, board) : false;
}

function isZero(row, column, board) {
  return board[row][column].value === 0 ? [row, column] : false;
}

export function isZeroTile(row, column, board) {
  return board[row] && board[row][column] ? isZero(row, column, board) : false;
}
