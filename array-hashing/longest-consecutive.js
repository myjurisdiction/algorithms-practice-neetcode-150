class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  longestConsecutive(nums) {
    let max = 0;
    const numsSet = new Set();

    for (let item of nums) {
      numsSet.add(item);
    }

    for (let i = 0; i < nums.length; i++) {
      let current = nums[i];

      if (numsSet.has(current - 1)) {
        continue;
      }

      let count = 0;

      while (numsSet.has(current)) {
        current++;
        count++;
      }

      max = Math.max(max, count);
    }

    return max;
  }
}

const s = new Solution();

console.log(s.longestConsecutive([2, 20, 4, 10, 3, 4, 5]));
console.log(s.longestConsecutive([0, 3, 2, 5, 4, 6, 1, 1]));

/**
 *. One way to solve this problem is by sorting it and then find the longest consecutive sequence
  and this will take n log n time

  Another way of doing this in n time

  traverse the array and put everything to set

  traverse again the array 
      for i th number, if num[i] - 1 exist in the set then that means that there is already a counter going on for this series of number.

      So we continue

      let count = 1
      let start = num[i]
      while (set.has(start)) {
          start++;
          count++
      }

      globalMax = max(count, globalmax);
 */
