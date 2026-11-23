class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */

  // brute force approach using backtracking algorithm
  jump(nums) {
    function backTrack(position = 0) {
      if (position >= nums.length - 1) {
        return 0;
      }

      if (nums[position] === 0) {
        return Infinity;
      }

      let minJump = Infinity;

      for (let step = 1; step <= nums[position]; step++) {
        const jumps = backTrack(step + position) + 1;
        minJump = Math.min(jumps, minJump);
      }

      return minJump;
    }

    const res = backTrack();

    return res === Infinity ? -1 : res;
  }

  jump_greedy(nums) {
    let minStepCount = 0;
    let left = 0,
      right = 0;

    while (right < nums.length - 1) {
      let farthest = 0;

      for (let step = left; step <= right; step++) {
        farthest = Math.max(farthest, step + nums[step]);
      }

      left = right + 1;
      right = farthest;
      minStepCount += 1;
    }

    return minStepCount;
  }
}

const s = new Solution();

console.log(s.jump([1, 2, 0, 1, 0]));
console.log(s.jump([1, 2, 1, 0, 1]));
console.log(s.jump_greedy([2, 4, 1, 1, 1, 1]));

/**
 *
 * [2,4,1,1,1,1]
 *
 * l = 0 (2)
 * r = 0 (2)
 * farthest = 2, l = r + 1, r = farthest
 *
 * l = 1
 * r = 2
 * farthest = 4, l = r + 1, r = farthest
 *
 *
 */
