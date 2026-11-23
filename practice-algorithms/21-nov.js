class Node {
  constructor(val, node = null) {
    this.next = node;
    this.val = val;
  }
}

const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);
const n5 = new Node(5);
const n6 = new Node(6);
const n7 = new Node(7);

const head = n1;

n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;
n5.next = n6;
n6.next = n7;
n7.next = n3;

// this will return the node which will return the node that initiates the cycle
function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      let temp = head;
      while (temp !== slow) {
        temp = temp.next;
        slow = slow.next;
      }

      return temp;
    }
  }

  return null;
}

// console.log(detectCycle(head));

// longest k substring
// s = "aabacbebebe", k = 3
// s = "aaaa", k = 2
// s = "aabaaab", k = 2

function longestKSubstring(s, k) {
  const window = new Map();
  let left = 0;
  let res = -1;
  const n = s.length;

  for (let right = 0; right < n; right++) {
    const currChar = s[right];
    window.set(currChar, (window.get(currChar) ?? 0) + 1);

    while (window.size > k) {
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);

      if (window.get(leftChar) === 0) {
        window.delete(leftChar);
      }

      left++;
    }

    if (window.size === k) {
      res = Math.max(res, right - left + 1);
    }
  }

  return res;
}
