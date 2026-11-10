class Solution {
  /**
   * @param {number[][]} intervals
   * @param {number[]} newInterval
   * @return {number[][]}
   */

  // brute force approach
  insert(intervals, newInterval) {
    const res = [];
    let i = 0;
    const n = intervals.length;

    // all those intervals that comes before new interval start timr
    while (i < n && intervals[i][1] < newInterval[0]) {
      res.push(intervals[i]);
      i++;
    }

    // case of overlapping
    while (i < n && intervals[i][0] <= newInterval[1]) {
      newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
      newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
      i++;
    }

    res.push(newInterval);

    // cover rest of the case
    while (i < n) {
      res.push(intervals[i]);
      i++;
    }

    return res;
  }

  // Greedy Approach
  insertGreedy(intervals, newInterval) {
    const res = [];
    const n = intervals.length;
    const start = 0,
      end = 1;
    let currentInterval = undefined;

    for (let i = 0; i < n; i++) {
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
  s.insertGreedy(
    [
      [1, 3],
      [4, 6],
    ],
    [2, 5],
  ),
);

console.log(
  s.insertGreedy(
    [
      [1, 2],
      [3, 5],
      [9, 10],
    ],
    [6, 7],
  ),
);

/**
 * Input: intervals = [[1,3],[4,6]], newInterval = [2,5]
 * 
 * Input: intervals = [[1,2],[3,5],[9,10]], newInterval = [6,7]

Output: [[1,2],[3,5],[6,7],[9,10]]
 * 
 * 
 *    iterating over intervals:
 *  
            if newInterval[1] (5) < current_i[0] (1) | new_interval_end < current_interval_start
                res.append(newInterval)
                return res + remaining interbvals in original input
         
            else if new_interval_start > current_interval_end
              res.append(currentInterval)
         
            else:
              newInterval = [min(new_interval_start, current_interval_start), max(new_interval_end, current_interval_end)]
 *  
 *    res.append(newInteral)
 *    return res
 *  
 * 
 * Let's simulate scenario one when we append the interval in the correct position and no overlapping happens
 * 
 *  - intervals = [[1,2],[3,5],[9,10]], newInterval = [6,7], res = []
 *  
 *  i -> 0, current_i -> [1,2], 
 * 
 *    7 < 1 -> false
 *    6 > 2 -> true
 *    res -> [[1,2]]
 * 
 * i -> 1, current_i -> [3,5]
 *  
 *    7  < 3 -> false
 *    6 > 5 -> true
 *    res -> [[1,2], [3,5]]
 * 
 * i -> 2, current_i -> [9,10]
 *    
 *    7 < 9 -> true
 *    res ->  [[1,2], [3,5], [6,7], [9, 10]] | solved
 * 
 *Simulating Overlapping case
 * 
 * Input: intervals = [[1,3],[4,6]], newInterval = [2,5]
 * 
 * i = 0, current -> [1,3]
 * 
      5 < 1 -> false
      2 > 3 -> false
      // there is overlapping
      newInterval -> [min(1,2), max(3,5)] -> [1,5]

   i = 1, current -> [4,6], newInterval = [1,5]

      5 < 4 -> false
      1 > 6 -> false
      // there is overlapping
      newInterval -> [min(1,4), max(5,6)] ->b [1, 6]
      res = [[1,6]]
 * 
 * 
 *  
 * 
 * 
 *    
 *    
 */

/**

    insert(intervals, newInterval) {
        let n = intervals.length,
            i = 0,
            res = [];

        while (i < n && intervals[i][1] < newInterval[0]) { // current interval item end is less than the new interval start
            res.push(intervals[i]);
            i++;
        }

        while (i < n && newInterval[1] >= intervals[i][0]) { // current intervals start is less than equal to new intervals end
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]); // new interval start -> min (new interval start, current interval start)
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]); // new interval end -> max (new interval end, current interval end )
            i++;
        }
        res.push(newInterval); // append the interval

        while (i < n) {  // which ever left and if i < n then append
            res.push(intervals[i]);
            i++;
        }

        return res;
    }
}


intervals = [[1,3],[4,6]], newInterval = [2,5]

      case 1 : current interval end is less than new interval start
          [,3], [,6] < 2 -> false
      case 2 : current interval start <= new interval end
          [1,], [4,] -> [5]
           -> i = 0, i < n -> true, curr -> [1,3], ni -> [2,5]
            new interval start -> min (1,2)
            new interval end -> max(3,5)
            ni -> [1,5]

          -> i = 1, i < n -> true, curr -> [4,6], ni -> [1,5]
            new interval start -> min (4, 1)
            new interval end -> min (6,5)
            ni -> [1,6]

 */
