class Solution {
  /**
   * @param {string} s
   * @param {number} k
   * @return {number}
   */

  // This version is the brute force
  /**
   *
   * @param {*} s
   * @param {*} k
   *
   *
   */
  characterReplacement(s, k) {
    let longestStrCount = 0;
    const counter = new Map();

    for (let start = 0; start < s.length; start++) {
      for (let end = start; end < s.length; end++) {
        const currentChar = s[end];
        counter.set(currentChar, (counter.get(currentChar) ?? 0) + 1);

        const currentWindowLength = end - start + 1;
        const replacementNeeded =
          currentWindowLength - Math.max(...counter.values());

        if (replacementNeeded <= k) {
          longestStrCount = Math.max(longestStrCount, currentWindowLength);
        }
      }
      counter.clear();
    }

    return longestStrCount;
  }
}

const s = new Solution();
console.log(s.characterReplacement("XYYX", 2));
console.log(s.characterReplacement("AAABABB", 1));
