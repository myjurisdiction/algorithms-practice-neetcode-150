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
  characterReplacementOptimised(s, k) {
    const freq = new Map();
    let maxFreq = 0;
    let left = 0;
    let maxL = 0;

    for (let right = 0; right < s.length; right++) {
      let currChar = s[right];
      let count = (freq.get(currChar) ?? 0) + 1;
      freq.set(currChar, count);

      maxFreq = Math.max(maxFreq, count);

      while (right - left + 1 - maxFreq > k) {
        freq.set(s[left], freq.get(s[left]) - 1);
        left++;
      }

      maxL = Math.max(maxL, right - left + 1);
    }

    return maxL;
  }
}

const s = new Solution();

console.log(s.characterReplacementOptimised("XYYX", 1));
console.log(s.characterReplacementOptimised("AAABABB", 1));
