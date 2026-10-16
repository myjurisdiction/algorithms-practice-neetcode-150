class Solution {
  /**
   * @param {number[]} prices
   * @return {number}
   */
  // two pointers approach
  maxProfit(prices) {
    let left = 0,
      right = 1;
    let maxP = 0,
      profit = 0;

    while (right < prices.length) {
      if (prices[left] < prices[right]) {
        profit = prices[right] - prices[left];
        maxP = Math.max(maxP, profit);
      } else {
        left = right;
      }

      right++;
    }

    return maxP;
  }
}

const s = new Solution();

console.log(s.maxProfit([10, 1, 5, 6, 7, 1]));
console.log(s.maxProfit([10, 8, 7, 5, 2]));
