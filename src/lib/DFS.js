function nQueensDFS(n) {
  // Initialize an empty board
  let board = Array(n).fill(-1);
  // Initialize an empty array to store all the states explored
  let states = [];
  // Call the helper function with the board, first column, and states array
  nQueensDFSHelper(board, 0, states);
  // Return the array of all states explored
  return states;
}

function nQueensDFSHelper(board, col, states) {
  // Add the current state to the array of states explored
  states.push(board.slice());
  // If all columns are filled, return the board as a solution
  if (col == board.length) {
    return board;
  }
  // Try placing a queen in each row of the current column
  for (let row = 0; row < board.length; row++) {
    // Check if the queen can be placed in the current row
    if (isValid(board, row, col)) {
      // Place the queen in the current row
      board[col] = row;
      // Recursively try to place queens in the remaining columns
      let result = nQueensDFSHelper(board, col + 1, states);
      // If a solution is found, return it
      if (result != null) {
        return result;
      }
      // If no solution is found, remove the queen from the current row
      board[col] = -1;
    }
  }
  // If no solution is found for the current column, return null
  return null;
}

function isValid(board, row, col) {
  // Check if the queen conflicts with any previously placed queens
  for (let i = 0; i < col; i++) {
    if (board[i] == row ||
        board[i] - i == row - col ||
        board[i] + i == row + col) {
      return false;
    }
  }
  return true;
}

export function dfs(n){
  const res = nQueensDFS(n)
  const initial = res.shift()
  const final = res.pop()
  const visited = res


  return {initial, visited, final}
}