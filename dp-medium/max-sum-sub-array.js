class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */

  // kadane's algorithm
  maxSubArray(nums) {
    let curr = 0,
      max = nums[0];

    for (let right = 0; right < nums.length; right++) {
      if (curr < 0) {
        curr = 0;
      }
      curr += nums[right];
      max = Math.max(curr, max);
    }

    return max;
  }
}

const s = new Solution();

console.log(s.maxSubArray([2, -3, 4, -2, 2, 1, -1, 4]));
console.log(s.maxSubArray([-1]));
