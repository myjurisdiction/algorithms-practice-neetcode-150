class Solution {
  /**
   * @param {string} s
   * @param {number} k
   * @return {number}
   */
  // brute force approach
  characterReplacement(s, k) {
    const charFreqMap = new Map();
    const n = s.length;
    let maxL = 0;

    for (let start = 0; start < n; start++) {
      for (let end = start; end < n; end++) {
        const char = s[end];
        charFreqMap.set(char, (charFreqMap.get(char) ?? 0) + 1);

        const currentWindowLength = end - start + 1;
        const replacementNeeded =
          currentWindowLength - Math.max(...charFreqMap.values());

        if (replacementNeeded <= k) {
          maxL = Math.max(maxL, currentWindowLength);
        }
      }
      charFreqMap.clear();
    }

    return maxL;
  }

  // Optimise approach
}

const s = new Solution();

console.log(s.characterReplacement("XYYX", 1));
console.log(s.characterReplacement("AAABABB", 1));
