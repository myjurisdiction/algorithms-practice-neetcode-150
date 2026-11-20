// Link to problem : https://leetcode.com/problems/linked-list-cycle-ii/?utm_source=chatgpt.com
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// head = [3,2,0,-4], pos = 1

const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(0);
const n4 = new ListNode(-4);

let head = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n2;

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (slow === fast) {
      // once slow and fast meet
      // take another pointer and move it to head
      let temp = head;

      // keep moving the two pointer one step at a time untill they meet.
      while (temp !== slow) {
        temp = temp.next;
        slow = slow.next;
      }

      return temp;
    }
  }

  return null;
};

console.log(detectCycle(head));
