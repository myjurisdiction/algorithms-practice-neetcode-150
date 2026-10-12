class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  findMin(nums) {
    let left = 0,
      right = nums.length - 1;
    let mid = undefined;

    while (left < right) {
      mid = left + Math.floor((right - left) / 2);

      if (nums[mid] < nums[right]) {
        right = mid; // shrink the search space and search in the left side of mid
      } else {
        // shrink space again but do it on the right side of mid
        left = mid + 1;
      }
    }

    return nums[left];
  }
}

const s = new Solution();

console.log(s.findMin([3, 4, 5, 6, 1, 2]));
console.log(s.findMin([4, 5, 0, 1, 2, 3]));
console.log(s.findMin([4, 5, 6, 7]));
