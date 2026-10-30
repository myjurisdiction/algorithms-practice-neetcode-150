class Solution {
  /**
   * @param {string} s1
   * @param {string} s2
   * @return {boolean}
   */

  // my intital approach which is wrong
  // checkInclusion(s1, s2) {
  //   const strSet = new Set();

  //   for (let char of s1) {
  //     strSet.add(char);
  //   }

  //   let counter = 0;
  //   const seen = new Set();

  //   for (let pointer = 0; pointer < s2.length; pointer++) {
  //     let currChar = s2[pointer];
  //     if (!seen.has(currChar) && strSet.has(currChar)) {
  //       seen.add(currChar);
  //       counter++;
  //     } else {
  //       counter = 0;
  //     }

  //     console.log(counter, currChar);

  //     if (counter === strSet.size) {
  //       return true;
  //     }
  //   }

  //   console.log(counter);

  //   return false;
  // }

  checkInclusion(s1, s2) {
    const s1Hash = this.hash(s1);
    const windowSize = s1.length;

    for (let i = 0; i <= s2.length - windowSize; i++) {
      const currentSubstring = s2.substring(i, i + windowSize);
      const currentHash = this.hash(currentSubstring);

      if (currentHash === s1Hash) {
        return true;
      }
    }

    return false;
  }

  hash(s) {
    const alphabets = Array.from({ length: 26 }).fill(0);

    for (let char of s) {
      const cCode = char.toLowerCase().charCodeAt() - 97;
      alphabets[cCode] += 1;
    }

    return alphabets.join("#");
  }
}

const s = new Solution();

console.log(s.checkInclusion("abc", "lecabee"));
console.log(s.checkInclusion("abc", "lecaabee"));
