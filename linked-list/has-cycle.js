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

const node1 = new ListNode(3);
const node2 = new ListNode(2);
const node3 = new ListNode(0);
const node4 = new ListNode(-4);

let head = node1;
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // creating a cycle here

class Solution {
  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  hasCycle(head) {
    const weakSet = new WeakSet();
    let curr = head;

    while (curr) {
      if (weakSet.has(curr)) {
        return true;
      }

      weakSet.add(curr);
      curr = curr.next;
    }

    return false;
  }

  hasCycleOptimised(head) {
    let fast = head;
    let slow = head;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;

      if (fast === slow) {
        return true;
      }
    }

    return false;
  }
}

const s = new Solution();

console.log(s.hasCycle(head));
console.log(s.hasCycleOptimised(head));
