// link to problem -> https://neetcode.io/problems/non-overlapping-intervals/question?list=neetcode150

class Solution {
  /**
   * @param {number[][]} intervals
   * @return {number}
   */
  eraseOverlapIntervals(intervals) {
    intervals.sort((a, b) => a[0] - b[0]); // intervals sorted in ascending order
    const start = 0,
      end = 1;
    let prevEnd = intervals[0][end];
    let res = 0;

    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][start] < prevEnd) {
        res++;
        prevEnd = Math.min(intervals[i][end], prevEnd);
      } else {
        prevEnd = intervals[i][end];
      }
    }

    return res;
  }
}

const s = new Solution();

// console.log(
//   s.eraseOverlapIntervals([
//     [1, 2],
//     [2, 4],
//     [1, 4],
//   ]),
// );

// console.log(
//   s.eraseOverlapIntervals([
//     [1, 2],
//     [2, 4],
//   ]),
// );

console.log(
  s.eraseOverlapIntervals([
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
  ]),
);

/**
 * prevEnd = 2, i = 1, curr -> [1,3]
 *    start = 1 < prevEnd -> true
 *    // which ends first -> prevEnd = min(2, 3) -> 2
 *
 * prevEnd = 2, i = 2, curr -> [2,4]
 *    start = 2 < prevEnd -> no
 *
 * got the error and its corrected
 */
