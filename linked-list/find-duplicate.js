class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  push(val) {
    const newNode = new ListNode(val);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = newNode;
    }
  }

  unshift(val) {
    const nn = new ListNode(val);

    if (this.head === null) {
      this.head = nn;
    } else {
      let temp = this.head;
      this.head = nn;
      nn.next = temp;
    }
  }

  getList() {
    let temp = this.head;

    if (temp === null) {
      return [];
    }

    const res = [];

    while (temp !== null) {
      res.push(temp.val);
      temp = temp.next;
    }

    return res;
  }

  getHead() {
    return this.head;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */

  // naive apporach is very simple
  findDuplicate(nums) {
    const uniqueSet = new Set();

    for (let num of nums) {
      if (uniqueSet.has(num)) {
        return num;
      }

      uniqueSet.add(num);
    }
  }
}

const s = new Solution();

console.log(s.findDuplicate([1, 2, 3, 2, 2]));
console.log(s.findDuplicate([1, 2, 3, 4, 4]));
console.log(s.findDuplicate([4, 3, 1, 4, 2]));
