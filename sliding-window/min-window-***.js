class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {string}
   */

  // this is the brute force approach where time complexity could be in ther order of O(n ** 3)
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

  // Optimised version
  minWindowOptimised(s, t) {
    if (t.length > s.length) return "";

    const needMap = new Map();

    for (let char of t) {
      needMap.set(char, (needMap.get(char) ?? 0) + 1);
    }

    const needCount = needMap.size;
    let haveCount = 0;

    const haveMap = new Map();
    let res = [-1, -1];
    let resLen = Infinity;
    let leftPointer = 0;

    for (let rightPointer = 0; rightPointer < s.length; rightPointer++) {
      const currChar = s[rightPointer];
      haveMap.set(currChar, (haveMap.get(currChar) ?? 0) + 1);

      // check if current chartacter exist in needMap and if it does and its respective count value is strictly equal across the various map then update the have count
      if (
        needMap.has(currChar) &&
        haveMap.get(currChar) === needMap.get(currChar)
      ) {
        haveCount++;
      }

      // when have is equal to need then we should strive to find the min window length
      while (haveCount === needCount) {
        // once have quals need update the res and resLen if the current window length is less than resLen
        if (rightPointer - leftPointer + 1 < resLen) {
          res = [leftPointer, rightPointer];
          resLen = rightPointer - leftPointer + 1;
        }

        // update left pointer and its corresponding value in the have map
        haveMap.set(s[leftPointer], haveMap.get(s[leftPointer]) - 1);
        if (
          needMap.has(s[leftPointer]) &&
          haveMap.get(s[leftPointer]) < needMap.get(s[leftPointer])
        ) {
          haveCount--;
        }
        leftPointer++;
      }
    }

    return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
  }
}

const s = new Solution();

console.log(s.minWindowOptimised("OUZODYXAZV", "XYZ"));

// console.log(s.minWindow("xyz", "xyz"));

// console.log(s.minWindow("x", "xy"));

console.log(s.minWindowOptimised("a", "b"));

console.log(s.minWindowOptimised("ab", "a"));

console.log(s.minWindowOptimised("aa", "aa"));
