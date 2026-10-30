class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {string}
   */
  minWindow(s, t) {
    const sLen = s.length;
    const tLen = t.length;

    if (tLen > sLen) {
      return "";
    }

    let leftPointer = 0,
      rightPointer = 0,
      minDiff = Infinity;

    const needle = this.createDict(t);

    for (let left = 0; left < sLen; left++) {
      for (let right = left; right < sLen; right++) {
        const currentSubString = s.substring(left, right + 1); // just to make right pointer inclusive
        const hayStack = this.createDict(currentSubString);

        if (this.compareTwoFreq(needle, hayStack)) {
          const currentDiff = right - left;
          if (currentDiff < minDiff) {
            minDiff = currentDiff;
            leftPointer = left;
            rightPointer = right;
          }
        }
      }
    }

    if (minDiff === Infinity) return "";

    return s.substring(leftPointer, rightPointer + 1); // just to make right pointer inclusive
  }

  createDict(s) {
    const freq = new Map();

    for (let char of s) {
      freq.set(char, (freq.get(char) ?? 0) + 1);
    }

    return freq;
  }

  compareTwoFreq(needle, hayStack) {
    if (hayStack.size < needle.size) {
      return false;
    }

    for (let [key, value] of needle) {
      const hayStackValue = hayStack.get(key) ?? null;

      if (!hayStackValue) {
        return false;
      }

      if (hayStackValue < value) {
        return false;
      }
    }

    return true;
  }
}

const s = new Solution();

// console.log(s.minWindow("OUZODYXAZV", "XYZ"));

// console.log(s.minWindow("xyz", "xyz"));

// console.log(s.minWindow("x", "xy"));

console.log(s.minWindow("a", "b"));

console.log(s.minWindow("ab", "a"));
