class Solution {
  /**
   * @param {string[]} strs
   * @return {string[][]}
   */
  groupAnagrams(strs) {
    const groupsMap = new Map();

    for (let str of strs) {
      const strKey = this.makeKey(str);
      const group = groupsMap.get(strKey) ?? [];
      group.push(str);
      groupsMap.set(strKey, group);
    }

    return [...groupsMap.values()];
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
console.log(s.groupAnagrams(["act", "pots", "tops", "cat", "stop", "hat"]));
console.log(s.groupAnagrams(["x"]));
console.log(s.groupAnagrams([""]));
