/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

// link to problem -> https://neetcode.io/problems/meeting-schedule/question?list=neetcode150

class Solution {
  /**
   * @param {Interval[]} intervals
   * @returns {boolean}
   */
  canAttendMeetings(intervals) {
    intervals.sort((a, b) => a.start - b.start);

    let curr = undefined,
      next = undefined;

    for (let i = 0; i < intervals.length - 1; i++) {
      curr = intervals[i];
      next = intervals[i + 1];

      if (next.start < curr.end) {
        return false;
      }
    }

    return true;
  }
}

const s = new Solution();

console.log(
  s.canAttendMeetings([
    { start: 0, end: 30 },
    { start: 5, end: 10 },
    { start: 15, end: 20 },
  ]),
);
console.log(
  s.canAttendMeetings([
    { start: 5, end: 8 },
    { start: 9, end: 15 },
  ]),
);
