class MaxHeap {
  constructor() {
    this.values = [];
  }

  insert(el) {
    this.values.push(el);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    let el = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (el <= parent) {
        break;
      }

      this.values[parentIdx] = el;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const currMax = this.values[0];
    const lastEl = this.values[this.values.length - 1];
    this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = lastEl;
      this.sinkDown();
    }

    return currMax;
  }

  sinkDown() {
    let idx = 0;
    let el = this.values[idx];
    const n = this.values.length;

    while (true) {
      let leftChildIdx = idx * 2 + 1;
      let rightChildIdx = idx * 2 + 2;

      let leftChild, rightChild, swap;

      if (leftChildIdx < n) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > el) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < n) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === undefined && rightChild > el) ||
          (swap !== undefined && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      console.log(swap);
      if (swap === undefined) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = el;
      idx = swap;
    }
  }

  size() {
    return this.values.length;
  }
}

class Solution {
  /**
   * @param {character[]} tasks
   * @param {number} n
   * @return {number}
   */
  // leastInterval(tasks, n) {}

  leastInterval(tasks, n) {
    let count = new Array(26).fill(0);
    for (let task of tasks) {
      count[task.charCodeAt() - "A".charCodeAt()]++;
    }

    let maxHeap = new MaxHeap();
    for (let i = 0; i < 26; i++) {
      if (count[i] > 0) maxHeap.insert(count[i]);
    }

    let time = 0;
    let q = [];

    while (maxHeap.size() > 0 || q.length > 0) {
      time++;

      if (maxHeap.size() > 0) {
        let cnt = maxHeap.extractMax() - 1;
        if (cnt !== 0) {
          q.push([cnt, time + n]);
        }
      }

      if (q.length > 0 && q[0][1] === time) {
        let popped = q[0];
        q.shift();
        maxHeap.insert(popped[0]);
      }
    }

    return time;
  }
}

const s = new Solution();

console.log(s.leastInterval(["X", "X", "Y", "Y"], 2));

/**
 * XY
 */
