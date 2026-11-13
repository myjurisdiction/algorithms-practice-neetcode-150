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
   * @param {ListNode} head
   * @param {number} n
   * @return {ListNode}
   */

  // this is the naive approach where i need to reverse the list two times
  removeNthFromEnd(head, n) {
    // reverse 1
    let reverseHead = this.reverseList(head);
    let temp = reverseHead;
    let prev = null;
    while (n > 1) {
      n--;
      prev = temp;
      temp = temp.next;
    }

    // temp points to hte node to be removed
    const temp2 = temp.next;
    temp.next = null;

    if (prev) {
      prev.next = temp2;
    } else {
      reverseHead = temp2;
    }

    // final reverse
    return this.reverseList(reverseHead);
  }

  reverseList(head) {
    let curr = head;
    let prev = null;

    while (curr) {
      let temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    return prev;
  }

  removeNthFromEndOptimised(head, n) {
    /**
     * create a dummy node and point it to head
     * left pointer points to dummy node
     * right pointer starting from right is n distance away to left
     */

    let dummy = new ListNode(0, head);
    let left = dummy;
    let right = head;

    while (n > 0 && right) {
      right = right.next;
      n--;
    }

    while (right) {
      left = left.next;
      right = right.next;
    }

    left.next = left.next.next;
    return dummy.next;
  }
}

const s = new Solution();
const ll = new LinkedList();

// for (let item of [1, 2, 3, 4]) {
//   ll.push(item);
// }

// for (let item of [5]) {
//   ll.push(item);
// }

for (let item of [1, 2]) {
  ll.push(item);
}

let head = ll.getHead();
// head = s.removeNthFromEndOptimised(head, 2);
// head = s.removeNthFromEnd(head, 1);
head = s.removeNthFromEnd(head, 2);

let dummy = head;

while (dummy) {
  console.log(dummy.val);
  dummy = dummy.next;
}
