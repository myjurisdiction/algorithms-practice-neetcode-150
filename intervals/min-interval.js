class Solution {
  /**
   * @param {number[][]} intervals
   * @param {number[]} queries
   * @return {number[]}
   */
  minInterval(intervals, queries) {
    const res = [];
    const start = 0,
      end = 1;

    for (let query of queries) {
      let minLen = Infinity;
      for (let i = 0; i < intervals.length; i++) {
        let currInterval = intervals[i];
        let currStart = currInterval[start];
        let currEnd = currInterval[end];

        if (query >= currStart && query <= currEnd) {
          minLen = Math.min(minLen, currEnd - currStart + 1);
        }
      }

      if (minLen === Infinity) {
        res.push(-1);
      } else {
        res.push(minLen);
      }
    }

    return res;
  }

  // the optimised version requires min heap so we will come back to it later
}

const s = new Solution();

console.log(
  s.minInterval(
    [
      [1, 3],
      [2, 3],
      [3, 7],
      [6, 6],
    ],
    [2, 3, 1, 7, 6, 8],
  ),
);
