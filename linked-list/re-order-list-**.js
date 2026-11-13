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
   * @return {void}
   */
  reorderList(head) {
    let start = head;
    const list = [];

    while (start) {
      list.push(start.val);
      start = start.next;
    }

    const dummy = new ListNode();
    let tail = dummy;
    start = 0;
    let end = list.length - 1;
    let flag = 0;

    while (start <= end) {
      if (flag === 0) {
        tail.next = new ListNode(list[start]);
        flag = 1;
        start++;
      } else {
        tail.next = new ListNode(list[end]);
        flag = 0;
        end--;
      }
      tail = tail.next;
    }

    return dummy.next;
  }

  // re-ordering happening in place
  // very importanrt
  reorderListInPlace(head) {
    let secondHalf = this.findMiddle(head);
    let reversedSecondHalf = this.reverseList(secondHalf.next);

    secondHalf.next = null;

    let first = head;
    let second = reversedSecondHalf;

    let temp1 = undefined,
      temp2 = undefined;

    while (second) {
      temp1 = first.next;
      temp2 = second.next;

      first.next = second;
      second.next = temp1;

      first = temp1;
      second = temp2;
    }
  }

  findMiddle(head) {
    let slow = head;
    let fast = slow.next;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
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
}

const s = new Solution();
const ll = new LinkedList();

for (let num of [0, 1, 2, 3, 4, 5, 6]) {
  ll.push(num);
}

const head = ll.getHead();
s.reorderListInPlace(head);

let temp = head;

while (temp) {
  console.log(temp.val);
  temp = temp.next;
}
