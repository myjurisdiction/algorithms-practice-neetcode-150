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

const ll = new LinkedList();

const sample1 = [0, 1, 2, 3];

for (let item of sample1) {
  ll.push(item); // 0 -> 1 -> 2 -> 3 -> 4 -> null
}

// for (let item of sample1) {
//   ll.unshift(item); //4 -> 3 -> 2 -> 1 -> 0 -> null
// }

class Solution {
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  reverseList(head) {
    let curr = head;
    let prev = null,
      temp = null;

    while (curr) {
      temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    return prev;
  }
}

const s = new Solution();

const head = ll.getHead();

let newHead = s.reverseList(head);

while (newHead) {
  console.log(newHead.val);
  newHead = newHead.next;
}

/**
 *  0 -> 1 -> 2 -> 3 -> null
 * 
 * curr -> node 0
 * prev -> null
 * 
 * temp = curr.next // node 1
 * curr.next = prev // null
 * prev = curr // node 0
 * curr = temp // node 1

 * 
 * curr -> node 1
 * prev -> 0
 * temp = curr.next // node 2
 * curr.next = prev // node 1
 */
