class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   * 
   * indexOf(searchElement)
indexOf(searchElement, fromIndex)
   */

  // brute force approach
  longestConsecutive(nums) {
    let maxConsecutiveCount = 0;

    for (let num of nums) {
      let nextInSeqNum = num + 1;
      let currentConsecutiveCount = 0;
      let nextInSeqIdx = nums.indexOf(nextInSeqNum);

      while (nextInSeqIdx !== -1) {
        currentConsecutiveCount++;
        nextInSeqIdx = nums.indexOf(nextInSeqNum++);
      }

      maxConsecutiveCount = Math.max(
        maxConsecutiveCount,
        currentConsecutiveCount,
      );
    }

    return maxConsecutiveCount;
  }

  // optimised apporach
  longestConsecutiveOptimised(nums) {
    let maxConsecutiveCount = 0;
    const numsSet = new Set(nums);

    for (let num of numsSet) {
      if (numsSet.has(num - 1)) {
        // This is the crux
        continue;
      }

      let nextInSeqNum = num + 1;
      let currentConsecutiveCount = 1;

      while (numsSet.has(nextInSeqNum)) {
        currentConsecutiveCount++;
        nextInSeqNum++;
      }

      maxConsecutiveCount = Math.max(
        maxConsecutiveCount,
        currentConsecutiveCount,
      );
    }

    return maxConsecutiveCount;
  }
}

const s = new Solution();

console.log(s.longestConsecutiveOptimised([2, 20, 4, 10, 3, 4, 5]));
console.log(s.longestConsecutiveOptimised([0, 3, 2, 5, 4, 6, 1, 1]));
