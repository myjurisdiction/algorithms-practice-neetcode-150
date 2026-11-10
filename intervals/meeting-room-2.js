/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
  /**
   * @param {Interval[]} intervals
   * @returns {number}
   */
  minMeetingRooms(intervals) {
    const startTimes = intervals
      .map((item) => item.start)
      .sort((a, b) => a - b);
    const endTimes = intervals.map((item) => item.end).sort((a, b) => a - b);

    let minRooms = 0;

    let s = 0,
      e = 0,
      count = 0;

    while (s < intervals.length) {
      if (startTimes[s] < endTimes[e]) {
        count++;
        s++;
      } else {
        count--;
        e++;
      }

      minRooms = Math.max(minRooms, count);
    }

    return minRooms;
  }
}

const s = new Solution();

const sample = [
  {
    start: 0,
    end: 40,
  },
  {
    start: 5,
    end: 10,
  },
  {
    start: 15,
    end: 20,
  },
];

console.log(s.minMeetingRooms(sample));
