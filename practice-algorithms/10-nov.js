class Solution {
  /**
   * @param {number[][]} intervals
   * @param {number[]} newInterval
   * @return {number[][]}
   */
  insert(intervals, newInterval) {
    const res = [];
    const start = 0,
      end = 1;
    let currentInterval = undefined;

    for (let i = 0; i < intervals.length; i++) {
      currentInterval = intervals[i];

      if (currentInterval[start] > newInterval[end]) {
        res.push(newInterval);
        return res.concat(intervals.slice(i));
      } else if (currentInterval[end] < newInterval[start]) {
        res.push(currentInterval);
      } else {
        newInterval = [
          Math.min(currentInterval[start], newInterval[start]),
          Math.max(currentInterval[end], newInterval[end]),
        ];
      }
    }

    res.push(newInterval);
    return res;
  }
}

const s = new Solution();

console.log(
  s.insert(
    [
      [1, 3],
      [4, 6],
    ],
    [2, 5],
  ),
);

console.log(
  s.insert(
    [
      [1, 2],
      [3, 5],
      [9, 10],
    ],
    [6, 7],
  ),
);
