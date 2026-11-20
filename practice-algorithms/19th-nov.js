// Intervals problems

class Solution {
  /**
   * @param {number[][]} intervals
   * @return {number}
   */

  insert(intervals, newInterval) {
    const res = [];
    const start = 0,
      end = 1;
    const n = intervals.length;

    for (let i = 0; i < n; i++) {
      const current = intervals[i];

      if (current[start] > newInterval[end]) {
        res.push(newInterval);
        return res.concat(intervals.slice(i));
      } else if (current[end] < newInterval[start]) {
        res.push(current);
      } else {
        newInterval = [
          Math.min(current[start], newInterval[start]),
          Math.max(current[end], newInterval[end]),
        ];
      }
    }

    res.push(newInterval);
    return res;
  }

  merge(intervals) {
    // sort the intervals and this is important
    const left = 0,
      right = 1,
      n = intervals.length;
    intervals.sort((a, b) => a[left] - b[left]);
    const res = [intervals[0]];

    let i = 1;

    while (i < n) {
      let prev = res[res.length - 1];
      let current = intervals[i];
      if (current[left] <= prev[right]) {
        prev[left] = Math.min(prev[left], current[left]);
        prev[right] = Math.max(prev[right], current[right]);
      } else {
        res.push(current);
      }

      i++;
    }

    return res;
  }

  eraseOverlapIntervals(intervals) {
    const start = 0,
      end = 1,
      n = intervals.length;
    intervals.sort((a, b) => a[start] - b[start]);

    let prevEnd = intervals[0][end],
      i = 1,
      res = 0;

    while (i < n) {
      const current = intervals[i];
      if (current[start] < prevEnd) {
        res++;
        prevEnd = Math.min(prevEnd, current[end]);
      } else {
        prevEnd = current[end];
      }

      i++;
    }

    return res;
  }

  canAttendMeetings(intervals) {
    const start = 0,
      end = 1,
      n = intervals.length;
    intervals.sort((a, b) => a.start - b.start);

    let i = 1;

    while (i < n) {
      const current = intervals[i];
      const prev = intervals[i - 1];
      console.log(current, prev);
      if (current.start < prev.end) {
        return false;
      }

      i++;
    }

    return true;
  }

  minMeetingRooms(intervals) {
    const startStack = [],
      endStack = [],
      n = intervals.length;

    for (let item of intervals) {
      const { start, end } = item;
      startStack.push(start);
      endStack.push(end);
    }

    startStack.sort((a, b) => a - b);
    endStack.sort((a, b) => a - b);

    let minCount = 0;
    let currentCount = 0;

    let start = 0,
      end = 0;

    while (start < n || end < n) {
      if (startStack[start] < endStack[end]) {
        currentCount++;
        start++;
      } else {
        currentCount--;
        end++;
      }

      minCount = Math.max(minCount, currentCount);
    }

    return minCount;
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
