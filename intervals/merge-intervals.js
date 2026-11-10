class Solution {
  /**
   * @param {number[][]} intervals
   * @return {number[][]}
   */

  // let's apply the bruteforce approach
  merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];
    const start = 0,
      end = 1;

    let last = undefined,
      curr = undefined;

    for (let i = 1; i < intervals.length; i++) {
      last = res[res.length - 1];
      curr = intervals[i];

      if (curr[start] <= last[end]) {
        last[end] = Math.max(curr[end], last[end]);
      } else {
        res.push(curr);
      }
    }

    return res;
  }
}

const s = new Solution();
console.log(
  s.merge([
    [1, 3],
    [7, 11],
    [3, 7],
  ]),
);
console.log(
  s.merge([
    [1, 3],
    [1, 5],
    [6, 7],
  ]),
);

console.log(
  s.merge([
    [1, 2],
    [2, 3],
  ]),
);
