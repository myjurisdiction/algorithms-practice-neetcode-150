class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let mid = undefined;

        while (left <= right) {
            mid = Math.floor((left + right) / 2);

            if (target === nums[mid]) {
                return mid;
            }

            if (target < nums[mid]) {
                right = mid - 1;
            } else {
                left  = mid + 1;
            }
        }

        return -1;
    }
}

const s = new Solution();

console.log(s.search([-1,0,2,4,6,8], 4));
console.log(s.search([-1,0,2,4,6,8], 3));
// console.log(s.search([-1,0,2,4,6,8], 4));
