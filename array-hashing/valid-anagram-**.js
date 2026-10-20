class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {boolean}
   */
  isAnagram(s, t) {
    if (s.length != t.length) {
      return false;
    }
    return this.makeKey(s) === this.makeKey(t);
  }

  makeKey(str) {
    const alphabets = new Array(26).fill(0);

    for (let char of str) {
      const strCharCode = char.toLowerCase().charCodeAt() - 97;
      alphabets[strCharCode]++;
    }

    return alphabets.join("#");
  }
}

const s = new Solution();
console.log(s.isAnagram("racecar", "carrace"));
