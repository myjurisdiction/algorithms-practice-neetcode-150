class Solution {
  /**
   * @param {number[][]} matrix
   * @param {number} target
   * @return {boolean}
   */
  searchMatrix(matrix, target) {
    let top = 0;
    let bot = matrix.length - 1;
    let midRow = undefined;

    while (top <= bot) {
      midRow = Math.floor((top + bot) / 2); // find the mid row

      // target is less than first item of the mid row
      if (target < matrix[midRow][0]) {
        bot = midRow - 1;
      }
      // target is greater than the last item of the mid row
      else if (target > matrix[midRow][matrix[midRow].length - 1]) {
        top = midRow + 1;
      } else {
        break;
      }
    }

    // this means that element does not exist at all in the matrix
    if (!(top <= bot)) {
      return false;
    }

    midRow = Math.floor((top + bot) / 2);
    let left = 0,
      right = matrix[midRow].length - 1;
    let mid = undefined;

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (target === matrix[midRow][mid]) {
        return true;
      }

      if (target < matrix[midRow][mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return false;
  }
}

const s = new Solution();

console.log(
  s.searchMatrix(
    [
      [1, 2, 4, 8],
      [10, 11, 12, 13],
      [14, 20, 30, 40],
    ],
    10,
  ),
);

console.log(
  s.searchMatrix(
    [
      [1, 2, 4, 8],
      [10, 11, 12, 13],
      [14, 20, 30, 40],
    ],
    15,
  ),
);
