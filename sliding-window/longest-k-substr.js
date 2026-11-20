// https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1

/**
 * @param {string} s
 * @param {number} k
 * @returns {number}
 */
class Solution {
  longestKSubstr(s, k) {
    if (k == 0) {
      return -1;
    }
    let left = 0,
      right = 0;
    const window = new Map();
    let maxLength = -1;
    const n = s.length;

    while (right < n) {
      const currChar = s[right];
      window.set(currChar, (window.get(currChar) ?? 0) + 1);

      while (window.size > k) {
        window.set(s[left], window.get(s[left]) - 1);

        if (window.get(s[left]) === 0) {
          window.delete(s[left]);
        }

        left++;
      }

      if (window.size === k) {
        maxLength = Math.max(maxLength, right - left + 1);
      }
      right++;
    }

    return maxLength;
  }
}

const s = new Solution();
console.log(s.longestKSubstr("aabacbebebe", 3));
console.log(s.longestKSubstr("tvtgv", 4));

/**
 * s = "aabacbebebe", k = 3
 *
 *  l -> 0,
 *  r -> 0,
 *  need = k (3),
 *  have = 1,
 *  window  = { a : 1}
 *
 *  l -> 0,
 *  r -> 1,
 *  need = k (3),
 *  have = 1,
 *  window  = { a : 2, }
 *
 *  l -> 0,
 *  r -> 2,
 *  need = k (3),
 *  have = 2,
 *  window  = { a : 2, b : 1 }
 *
 *  l -> 0,
 *  r -> 3,
 *  need = k (3),
 *  have = 2,
 *  window  = { a : 3, b : 1 }
 *
 * "aabacbebebe"
 *  l -> 0,
 *  r -> 4,
 *  need = k (3),
 *  have = 3,
 *  window  = { a : 3, b : 1, c : 1 }
 *
 *  "aabacbebebe"
 *  l -> 1,
 *  r -> 4,
 *  need = k (3),
 *  have = 3,
 *  window  = { a : 2, b : 1, c : 1 }
 *
 */
