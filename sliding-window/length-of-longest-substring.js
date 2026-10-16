class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  lengthOfLongestSubstring(s) {
    let left = 0,
      right = 0;
    let uniqueChars = new Set();
    const n = s.length;
    let maxLength = 0;

    while (right < n) {
      while (uniqueChars.has(s[right])) {
        uniqueChars.delete(s[left]);
        left++;
      }

      uniqueChars.add(s[right]);
      maxLength = Math.max(uniqueChars.size, maxLength);
      right++;
    }

    return maxLength;
  }
}

const s = new Solution();

console.log(s.lengthOfLongestSubstring("abcabcbb"));
console.log(s.lengthOfLongestSubstring("zxyzxyz"));
console.log(s.lengthOfLongestSubstring("xxxx"));
