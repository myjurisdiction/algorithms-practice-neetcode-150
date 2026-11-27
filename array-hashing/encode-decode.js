class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs) {
    let res = "";

    for (let word of strs) {
      res += `${word.length}#${word}`;
    }

    return res;
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */

  // 5#hello5#world
  decode(str) {
    let i = 0,
      j = 0;
    const result = [];

    while (i < str.length) {
      j = i;
      while (j < str.length && str[j] !== "#") {
        j++;
      }

      const extractedRawLength = str.substring(i, j);
      const length = Number(extractedRawLength);
      const word = str.substring(j + 1, j + 1 + length);
      result.push(word);
      i = j + 1 + length;
    }

    return result;
  }
}

const s = new Solution();

const encodedString = s.encode(["hello", "world"]);
console.log("encoded =>", encodedString);
const decodedOutput = s.decode(encodedString);
console.log("decoded =>", decodedOutput);

/**
 *  5#hello5#world
 *  i = 0, j = 0
 *
 */
