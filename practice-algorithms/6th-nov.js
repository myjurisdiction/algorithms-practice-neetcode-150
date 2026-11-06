{
  class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
      let left = 0;
      let max = 0;

      for (let right = 1; right < prices.length; right++) {
        let currentProfit = prices[right] - prices[left];

        if (currentProfit > max) {
          max = currentProfit;
        } else if (currentProfit < 0) {
          left = right;
        }
      }

      return max;
    }
  }
  /**
   * l -> 7
   * r -> 1
   * p -> -6
   *
   * l -> 1
   * r -> 5
   * p -> 4
   *
   * r -> 3
   * p -> 2
   *
   * r -> 6
   * l -> 1
   * p -> 5
   *
   * r -> 4
   */

  // const s = new Solution();
  // console.log(s.maxProfit([7, 1, 5, 3, 6, 4]));
  // console.log(s.maxProfit([10, 1, 5, 6, 7, 1]));
  // console.log(s.maxProfit([10, 8, 7, 5, 2]));
}

{
  class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
      let left = 0,
        right = 0;
      const unique = new Set();
      let max = 0;

      while (right < s.length) {
        const currChar = s[right];

        while (unique.has(currChar)) {
          unique.delete(s[left]);
          left++;
        }

        unique.add(currChar);
        max = Math.max(max, unique.size);
        right++;
      }

      return max;
    }
  }

  /**
   *  s = "zxyzxyz"
   * l -> 0
   * r -> 0
   * set -> (z) // also with every insertion of unique char in the set, also check the max character length
   *
   * r -> 1 (x)
   * set -> (zx)
   *
   * r -> 2 (y)
   * set -> (zxy)
   *
   * r -> z // since z already exists in the set therefore remove items from the left unless (z) does not exist in the set
   * set(xyz)
   * l -> 1
   */

  // const s = new Solution();
  // console.log(s.lengthOfLongestSubstring("zxyzxyz"));
  // console.log(s.lengthOfLongestSubstring("xxxx"));
}

{
  class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    // bruteforce
    characterReplacement(s, k) {
      let max = 0;

      for (let left = 0; left < s.length; left++) {
        const counter = new Map();
        for (let right = left; right < s.length; right++) {
          const currChar = s[right];
          counter.set(currChar, (counter.get(currChar) ?? 0) + 1);

          const currentWindowLength = right - left + 1;
          const replacementNeeded =
            currentWindowLength - Math.max(...counter.values());

          if (replacementNeeded <= k) {
            max = Math.max(max, currentWindowLength);
          }
        }
      }

      return max;
    }

    // optimised
    characterReplacementOptimised(s, k) {
      let max = 0;
      const counter = new Map();
      let left = 0,
        right = 0;
      let maxCount = 0;

      for (; right < s.length; right++) {
        const currChar = s[right];
        const count = (counter.get(currChar) ?? 0) + 1;
        counter.set(currChar, count);
        maxCount = Math.max(maxCount, count);

        while (right - left + 1 - maxCount > k) {
          if (counter.has(s[left])) {
            counter.set(s[left], counter.get(s[left]) - 1);
          }
          left++;
        }

        max = Math.max(max, right - left + 1);
      }

      return max;
    }
  }

  // const s = new Solution();
  // console.log(s.characterReplacementOptimised("XYYX", 2));
  // console.log(s.characterReplacementOptimised("AAABABB", 1));
}

{
  class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
      if (s1.length > s2.length) {
        return false;
      }

      let left = 0;
      let right = s1.length - 1;

      if (right < 0) {
        return false;
      }

      const encodedS1 = this.encodeString(s1);
      let result = false;

      while (right < s2.length) {
        const window = s2.substring(left, right + 1);
        const encodedWindow = this.encodeString(window);

        if (encodedS1 === encodedWindow) {
          result = true;
          break;
        }
        left++;
        right++;
      }

      return result;
    }

    encodeString(s) {
      const alphabets = Array.from({ length: 26 }).fill(0);

      for (let char of s) {
        const charCode = char.toLowerCase().charCodeAt() - 97; // why 97 -> 97 represents 'a' in ASCII char encoding
        alphabets[charCode]++;
      }

      return alphabets.join("#");
    }
  }

  // const s = new Solution();

  // console.log(s.checkInclusion("abc", "lecabee"));
  // console.log(s.checkInclusion("abc", "lecaabee"));
}

{
  class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
      if (t.length > s.length) {
        return "";
      }
      const needMap = new Map();

      for (let char of t) {
        needMap.set(char, (needMap.get(char) ?? 0) + 1);
      }

      let haveCount = 0;
      const needCount = needMap.size;

      let res = [-1, -1];
      let minL = Infinity;
      const window = new Map();
      let left = 0,
        right = 0;

      while (right < s.length) {
        let currChar = s[right];
        window.set(currChar, (window.get(currChar) ?? 0) + 1);

        if (
          needMap.has(currChar) &&
          window.get(currChar) === needMap.get(currChar)
        ) {
          haveCount++;
        }

        while (haveCount === needCount) {
          if (right - left + 1 < minL) {
            minL = right - left + 1;
            res = [left, right];
          }

          window.set(s[left], window.get(s[left]) - 1);

          if (
            needMap.has(s[left]) &&
            window.get(s[left]) < needMap.get(s[left])
          ) {
            haveCount--;
          }

          left++; // decreasing the window length
        }

        right++;
      }

      return minL === Infinity ? "" : s.substring(res[0], res[1] + 1);
    }
  }

  // const s = new Solution();

  // console.log(s.minWindow("OUZODYXAZV", "XYZ"));
  // console.log(s.minWindow("aa", "aa"));
  // console.log(s.minWindow("xyz", "xyz"));
  // console.log(s.minWindow("x", "xy"));

  /**
   * Let's build the intuition
   * 
   * variables: left = 0, right = 0, minL = -Infinity, freq  = new Map(), res = [-1, -1]
   *
   *  need : {
            X : 1, 
            Y : 1, 
            Z : 1
   *    }

    - left = 0, right = 0
      have : {
      O : 1 // not important
       }

   - left = 0, right = 1
      have : {
      O : 1 // not important
      U : 1 // not important
       }

     - left = 0, right = 2
      have : {
           O : 1 // not important
           U : 1 // not important
           Z : 1 // not important
       }

    - left = 0, right = 3
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
       }

     - left = 0, right = 4
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
       }
   
    - left = 0, right = 5
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 1
       }
      //  current character exists in need map and if have map has currentchar. count === need map char count, increment haveCount
      haveCount = 1, needCount = 3

    - left = 0, right = 6
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 1,
           X : 1
       }
       //  current character exists in need map and if have map has currentchar. count === need map char count, increment haveCount
      haveCount = 2, needCount = 3

    - left = 0, right = 7
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 1,
           X : 1,
           A : 1 // not important
       }
      haveCount = 2, needCount = 3

    - left = 0, right = 8
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 1,
           X : 1,
           A : 1 // not important
           Z : 1
       }
      //  current character exists in need map and if have map has currentchar. count === need map char count, increment haveCount
      haveCount = 3, needCount = 3 | Now, since haveCount === needCount, let's shrink the window |
      shrinking the window also means keeping haveCount === needCount,
      While (haveCount === needCount) {
          // capture the minL and left and right pointer value to extract the min valid substring
          if (right - left + 1 > minL) {
            minL = right - left + 1;
            res = [left, right]
          }

          have.set(s[left], have.get(s[left]) - 1)

          if s[left] in need Map and haveMap.get(s[left]) < needMap.get(s[left]) // since haveCount follows stric char count equality
            decrement haveCount value as well
      }

    - left = 1, right = 8
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 1,
           X : 1,
           A : 1 // not important
           Z : 1
       }
      
       ...
       ...

    - left = 5, right = 8
      have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 0
           X : 1,
           A : 1 // not important
           Z : 1
       }
        
      haveCount = 2

    - left = 5, right = 9
    have : {
           O : 2 // not important
           U : 1 // not important
           Z : 1 // not important
           D : 1 // not important
           Y : 0
           X : 1,
           A : 1 // not important
           Z : 1,
           V : 1
       }
      
      now right has reached the tail of the string so its now time to exist the loop.
      so minL = 4
      left -> 5
      right = 8

      minString formed -> YXAZ
    
      

   */
}

{
  class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    // optimised
    maxSlidingWindow(nums, k) {}
  }
}
