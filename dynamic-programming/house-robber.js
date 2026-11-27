class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */

  // This i did not underastand -> let's understand this whole tomorrow
  rob(nums) {
    let rob1 = 0,
      rob2 = 0;

    for (let item of nums) {
      const temp = Math.max(item + rob1, rob2);
      rob1 = rob2;
      rob2 = temp;
    }

    return rob2;
  }
}

const s = new Solution();

console.log(s.rob([2, 9, 8, 3, 6]));
