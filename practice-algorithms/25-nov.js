class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */
  topKFrequent(nums, k) {
    const buckets = [];
    const freq = new Map();
    const result = [];

    for (let item of nums) {
      freq.set(item, (freq.get(item) ?? 0) + 1);
    }

    for (let [key, value] of freq) {
      const bucket = buckets[value] ?? [];
      bucket.push(key);
      buckets[value] = bucket;
    }

    for (let i = buckets.length - 1; i >= 0; i--) {
      if (i in buckets) {
        for (let item of buckets[i]) {
          result.push(item);
          k--;

          if (k === 0) {
            break;
          }
        }
      }

      if (k === 0) {
        break;
      }
    }

    return result;
  }
}

const s = new Solution();

const nums = [1, 2, 2, 3, 3, 3, 4, 4, 4],
  k = 2;

console.log(s.topKFrequent(nums, k));
console.log(s.topKFrequent([7, 7], 1));
console.log(s.topKFrequent([5, 5, 5, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2], 2));
console.log(s.topKFrequent([1, 1, 1, 2, 2, 3], 2));
console.log(s.topKFrequent([1, 2, 2, 3, 3, 3], 2));
// const nums = [7,7], k = 1;

/**
 * How to approach this problem is very simple
 *
 * - heap approach (n log n) time solution
 *
 * -> Creat a freq map
 *  {
 *   1 : 1,
 *   2 : 2,
 *   3 : 3,
 *   4 : 3
 * }
 *   0  1   2   3      4   5
 * [ * [1] [2] [3, 4]  *   *  ]
 *
 */
