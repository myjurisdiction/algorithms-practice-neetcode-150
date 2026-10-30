{
  class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    // characterReplacement(s, k) {
    //   let maxL = 0;
    //   const n = s.length;

    //   for (let start = 0; start < n; start++) {
    //     const counterMap = new Map();
    //     for (let end = start; end < n; end++) {
    //       const currentChar = s[end];
    //       counterMap.set(currentChar, (counterMap.get(currentChar) ?? 0) + 1);

    //       const currentWindowLength = end - start + 1;

    //       const replacementNeeded =
    //         currentWindowLength - Math.max(...counterMap.values());

    //       if (replacementNeeded <= k) {
    //         maxL = Math.max(maxL, currentWindowLength);
    //       }
    //     }
    //   }

    //   return maxL;
    // }

    characterReplacement(s, k) {
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

  console.log(s.characterReplacement("AAABABB", 1));
  console.log(s.characterReplacement("ABAB", 1));
}
