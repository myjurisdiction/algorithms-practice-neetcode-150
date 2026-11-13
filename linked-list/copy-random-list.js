class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

const node0 = new Node(3);
const node1 = new Node(7);
const node2 = new Node(4);
const node3 = new Node(5);

let head = node0;
node0.next = node1;
node1.next = node2;
node2.next = node3;
node3.next = null;

node0.random = null;
node1.random = node3;
node2.random = node0;
node3.random = node1;

class Solution {
  /**
   * @param {Node} head
   * @return {Node}
   */
  copyRandomList(head) {
    if (!head) return null;
    const copies = new Map();

    for (let curr = head; curr; curr = curr.next) {
      copies.set(curr, new Node(curr.val));
    }

    for (let curr = head; curr; curr = curr.next) {
      const clonedNode = copies.get(curr);
      clonedNode.next = curr.next ? copies.get(curr.next) : null;
      clonedNode.random = curr.random ? copies.get(curr.random) : null;
    }

    return copies.get(head);
  }
}

const s = new Solution();

const newHead = s.copyRandomList(head);
let dummy = newHead;

let count = 99;

while (dummy) {
  dummy.val = count++;
  dummy = dummy.next;
}

console.dir(head, { depth: 5 }); // original
console.dir(newHead, { depth: 5 });
