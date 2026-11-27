class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */
  isValidSudoku(board) {
    // scans the row (1 to 9)
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set(); // for each row i need a set to find the duplicate value
      // also if i encounter "." the continue because the problem states that board does not have to filled to be valid.
      let rowCellValue = null;

      for (let j = 0; j < 9; j++) {
        rowCellValue = board[i][j];

        if (rowCellValue === ".") {
          continue;
        }

        if (rowSet.has(rowCellValue)) {
          return false;
        }

        rowSet.add(rowCellValue);
      }
    }

    //  scans the column (1 to 9)
    for (let i = 0; i < 9; i++) {
      const columnSet = new Set();
      let columnCellValue = null;

      for (let j = 0; j < 9; j++) {
        columnCellValue = board[j][i];

        if (columnCellValue === ".") {
          continue;
        }

        if (columnSet.has(columnCellValue)) {
          return false;
        }

        columnSet.add(columnCellValue);
      }
    }

    // scan each 3 By 3 Box in the board
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxColumn = 0; boxColumn < 9; boxColumn += 3) {
        const boxSet = new Set();
        let boxCellValue = null;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            boxCellValue = board[boxRow + i][boxColumn + j];

            if (boxCellValue === ".") {
              continue;
            }

            if (boxSet.has(boxCellValue)) {
              return false;
            }

            boxSet.add(boxCellValue);
          }
        }
      }
    }

    return true;
  }
}

const s = new Solution();

/**
 * 1 - Each row must contain the digits 1-9 without duplicates.
   2 - Each column must contain the digits 1-9 without duplicates.
   3 - Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without duplicates.

   first for loop checks the row
   second loop checks the column
   third loop check 3 * 3 box
 */

const input1 = [
  ["1", "2", ".", ".", "3", ".", ".", ".", "."],
  ["4", ".", ".", "5", ".", ".", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", ".", "3"],
  ["5", ".", ".", ".", "6", ".", ".", ".", "4"],
  [".", ".", ".", "8", ".", "3", ".", ".", "5"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", ".", ".", ".", ".", ".", "2", ".", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "8"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const input2 = [
  ["1", "2", ".", ".", "3", ".", ".", ".", "."],
  ["4", ".", ".", "5", ".", ".", ".", ".", "."],
  [".", "9", "1", ".", ".", ".", ".", ".", "3"],
  ["5", ".", ".", ".", "6", ".", ".", ".", "4"],
  [".", ".", ".", "8", ".", "3", ".", ".", "5"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", ".", ".", ".", ".", ".", "2", ".", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "8"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
