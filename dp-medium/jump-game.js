class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */

  // brute force approach using backtracking algorithm
  canJump(nums) {
    function backTrack(position = 0) {
      if (position >= nums.length - 1) {
        return true;
      }

      if (nums[position] === 0) {
        return false;
      }

      for (let step = 1; step <= nums[position]; step++) {
        if (backTrack(step + position)) {
          return true;
        }
      }
    }

    return backTrack();
  }

  // greedy approach
  canJump_greedy(nums) {
    let goal = nums.length - 1;

    for (let i = nums.length - 2; i >= 0; i--) {
      if (i + nums[i] >= goal) {
        goal = i;
      }
    }

    return goal === 0 ? true : false;
  }
}

const s = new Solution();

console.log(s.canJump_greedy([1, 2, 0, 1, 0]));
console.log(s.canJump_greedy([1, 2, 1, 0, 1]));
