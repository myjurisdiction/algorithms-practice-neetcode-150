/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

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
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  addTwoNumbers(l1, l2) {
    const dummy = new ListNode();
    let tail = dummy;
    let carryOver = 0;

    while (l1 || l2 || carryOver) {
      const v1 = l1 ? l1.val : 0;
      const v2 = l2 ? l2.val : 0;

      let sum = v1 + v2 + carryOver;
      carryOver = Math.floor(sum / 10);
      sum = sum % 10;
      tail.next = new ListNode(sum);
      tail = tail.next;

      l1 = l1 ? l1.next : null;
      l2 = l2 ? l2.next : null;
    }

    return dummy.next;
  }
}

const s = new Solution();
const ll1 = new LinkedList();
const ll2 = new LinkedList();

for (let node of [5, 5, 5]) {
  ll1.push(node);
}

for (let node of [5, 5, 5]) {
  ll2.push(node);
}

// for (let node of [9]) {
//   ll1.push(node);
// }

// for (let node of [9]) {
//   ll2.push(node);
// }

const h1 = ll1.getHead();
const h2 = ll2.getHead();

const sumList = s.addTwoNumbers(h1, h2);
let dummyHead = sumList;

while (dummyHead) {
  console.log(dummyHead.val);
  dummyHead = dummyHead.next;
}
