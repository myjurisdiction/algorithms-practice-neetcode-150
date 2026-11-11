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

const ll1 = new LinkedList();
const ll2 = new LinkedList();

const list1 = [1, 2, 4, 7, 8];
const list2 = [1, 3, 5, 100, 200, 300, 400];

for (let item of list1) {
  ll1.push(item);
}

for (let item of list2) {
  ll2.push(item);
}

// console.dir(ll1, { depth: 5 });
// console.dir(ll2, { depth: 5 });

class Solution {
  /**
   * @param {ListNode} list1
   * @param {ListNode} list2
   * @return {ListNode}
   */

  // this is the
  mergeTwoLists(list1, list2) {
    let p1 = list1;
    let p2 = list2;

    const nh = new ListNode();

    while (p1 && p2) {
      if (p1.val < p2.val) {
        this.push(nh, p1.val);
        p1 = p1.next;
      } else {
        this.push(nh, p2.val);
        p2 = p2.next;
      }
    }

    while (p1) {
      this.push(nh, p1.val);
      p1 = p1.next;
    }

    while (p2) {
      this.push(nh, p2.val);
      p2 = p2.next;
    }

    return nh.next;
  }

  push(head, val) {
    const nn = new ListNode(val);
    if (head === null) {
      head = nn;
    } else {
      let temp = head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = nn;
    }
  }

  // A better version
  mergeTwoListsOptimised(list1, list2) {
    let p1 = list1;
    let p2 = list2;

    const dummy = new ListNode();
    let tail = dummy;

    while (p1 && p2) {
      if (p1.val < p2.val) {
        tail.next = p1;
        p1 = p1.next;
      } else {
        tail.next = p2;
        p2 = p2.next;
      }
      tail = tail.next;
    }

    tail.next = p1 || p2;

    return dummy.next;
  }
}

const head1 = ll1.getHead();
const head2 = ll2.getHead();

const s = new Solution();

let newHead = s.mergeTwoListsOptimised(head1, head2);

while (newHead) {
  console.log(newHead.val);
  newHead = newHead.next;
}
