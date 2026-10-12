class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  search(nums, target) {
    let left = 0,
      right = nums.length - 1,
      mid = undefined;

    // this step searches for min
    while (left < right) {
      mid = left + Math.floor((right - left) / 2);
      // if mid item < right item, then search in left because minimum exist on the left
      if (nums[mid] < nums[right]) {
        right = mid;
      } else {
        // else search in right because minimum will be in the right
        left = mid + 1;
      }
    }
    const minIndex = left;

    function binarySearch(left, right) {
      while (left <= right) {
        mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
          return mid;
        }

        if (target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      return -1;
    }

    let result = -1;

    // This means array was not rotated
    if (minIndex === 0) {
      result = binarySearch(0, nums.length - 1);
    } else {
      result = binarySearch(minIndex, nums.length - 1);

      if (result === -1) {
        result = binarySearch(0, minIndex - 1);
      }
    }

    return result;
  }

  searchEfficient(nums, target) {
    let left = 0,
      right = nums.length - 1,
      mid = undefined;

    // this step searches for min
    while (left < right) {
      mid = left + Math.floor((right - left) / 2);
      // if mid item < right item, then search in left because minimum exist on the left
      if (nums[mid] < nums[right]) {
        right = mid;
      } else {
        // else search in right because minimum will be in the right
        left = mid + 1;
      }
    }
    const pivot = left;
    ((left = 0), (right = nums.length - 1));

    function binarySearch(left, right) {
      while (left <= right) {
        mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
          return mid;
        }

        if (target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      return -1;
    }

    if (target >= nums[pivot] && target <= nums[right]) {
      left = pivot;
    } else {
      right = pivot - 1;
    }

    return binarySearch(left, right);
  }
}

const s = new Solution();

console.log(s.searchEfficient([3, 4, 5, 6, 1, 2], 1));
console.log(s.searchEfficient([3, 5, 6, 0, 1, 2], 4));
