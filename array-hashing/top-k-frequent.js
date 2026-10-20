class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */

  // This is the Brute force solution
  topKFrequent(nums, k) {
    const freqMap = new Map();

    for (let num of nums) {
      let numsCount = (freqMap.get(num) ?? 0) + 1;
      freqMap.set(num, numsCount);
    }

    const result = [];
    const seen = new Set();

    while (k !== 0) {
      let max = 0;
      let currentMaxKey = 0;
      for (let [key, value] of freqMap) {
        if (!seen.has(key) && value > max) {
          max = value;
          currentMaxKey = key;
        }
      }
      result.push(currentMaxKey);
      seen.add(currentMaxKey);
      k--;
    }

    return result;
  }

  /**
   *
   * @param {*} nums
   * @param {*} k
   *
   * - Algorithm
   *  - build a freq map
   *  - create a bucket of size n where n is length of nums
   *  - iterate the freqMap, and the value becomes the index at which you push the key
   *  - reverse iterate the bucket
   *  - Once you find a bucket, iterate the bucket and pull out values in order
   *  - keep in mind pick upto the values which satifies the k
   */
  topKFrequentBucketSort(nums, k) {
    const freqMap = new Map();
    const buckets = new Array(nums.length);
    const result = [];

    nums.forEach((item) => {
      freqMap.set(item, (freqMap.get(item) ?? 0) + 1);
    });

    for (let [key, value] of freqMap) {
      const bucket = buckets[value] ?? [];
      bucket.push(key);
      buckets[value] = bucket;
    }

    for (let i = buckets.length - 1; i > 0; i--) {
      let resultsMet = false;
      if (i in buckets) {
        // hole detection
        const bucket = buckets[i];

        for (let j = 0; j < bucket.length; j++) {
          if (result.length === k) {
            resultsMet = true;
            break;
          }

          result.push(bucket[j]);
        }
      }

      if (resultsMet) {
        break;
      }
    }

    return result;
  }
}

const s = new Solution();
console.log(s.topKFrequentBucketSort([1, 2, 2, 3, 3, 3], 2));
console.log(s.topKFrequentBucketSort([7, 7], 1));
console.log(
  s.topKFrequentBucketSort([5, 5, 5, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2], 2),
);
console.log(s.topKFrequentBucketSort([1, 1, 1, 2, 2, 3], 2));
console.log(s.topKFrequentBucketSort([1, 2, 2, 3, 3, 3], 2));
