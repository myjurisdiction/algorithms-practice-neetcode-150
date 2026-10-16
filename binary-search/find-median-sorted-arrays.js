class Solution {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number}
   */
  findMedianSortedArrays(nums1, nums2) {
    let i = 0,
      j = 0;
    let m = nums1.length,
      n = nums2.length;
    const mergedArray = [];

    while (i < m && j < n) {
      if (nums1[i] <= nums2[j]) {
        mergedArray.push(nums1[i]);
        i++;
      } else {
        mergedArray.push(nums2[j]);
        j++;
      }
    }

    while (i < m) {
      mergedArray.push(nums1[i]);
      i++;
    }

    while (j < n) {
      mergedArray.push(nums2[j]);
      j++;
    }

    // find median
    // check by finding the length of the array

    const isEven = (m + n) % 2 === 0;
    const mid = Math.floor((m + n) / 2);

    // even case
    if (isEven) {
      return (mergedArray[mid - 1] + mergedArray[mid]) / 2;
    }
    return mergedArray[mid];
  }
}

const s = new Solution();

console.log(s.findMedianSortedArrays([1, 2], [3]));
console.log(s.findMedianSortedArrays([1, 3], [2, 4]));
// console.log(s.findMedianSortedArrays([1, 3], [2, 4]));
