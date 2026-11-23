class MaxHeap {
  constructor() {
    this.values = [];
  }

  push(el) {
    this.values.push(el);
    this.bubbleUp();
  }

  pop() {
    /**
     * This method will return the min value which lies at the root node
     * How will it re-balance the tree ?
     *  pop el from the last position
     *  put it at the top
     *  then perform sync down
     */
    const min = this.values[0];
    const last = this.values[this.values.length - 1];
    this.values.pop();

    if (this.values.length) {
      this.values[0] = last;
      this.syncDown();
    }
    return min;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const last = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (parent > last) break;

      this.values[parentIdx] = last;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  syncDown() {
    const n = this.values.length;
    let idx = 0;
    const curr = this.values[idx];

    while (true) {
      let leftChild,
        rightChild,
        swap = null;

      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;

      if (leftChildIdx < n) {
        leftChild = this.values[leftChildIdx];
        if (curr < leftChild) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < n) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > curr) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = curr;
      idx = swap;
    }
  }

  get size() {
    return this.values.length;
  }
}

class Solution {
  /**
   * @param {character[]} tasks
   * @param {number} n
   * @return {number}
   */

  leastInterval(tasks, n) {
    /**
     * Algorithm :
     *
     * using max heap and queue
     *
     * 1.  count characters freq
     * 2. push the freq in max heap
     *
     * 3. while (max_heap.size or queue.length)
     *      count++;
     *
     *      if (queue[0][1] === count) {
     *          new_task = queue[0][0]
     *          queue.unshift()
     *          max_heap.push(new_task)
     *      }
     *
     *      task = max_heap.extractMax()
     *      remaining_task = task - 1
     *      queue.push([remaining_task, count + n]);
     *
     *   return count
     */

    const freq = new Map();

    for (const task of tasks) {
      freq.set(task, (freq.get(task) ?? 0) + 1);
    }

    const maxHeap = new MaxHeap();
    const queue = [];
    let time = 0;

    for (let taskCount of freq.values()) {
      maxHeap.push(taskCount);
    }

    while (maxHeap.size > 0 || queue.length > 0) {
      time++;

      if (maxHeap.size > 0) {
        const currTask = maxHeap.pop();
        const remainingTask = currTask - 1;
        if (remainingTask > 0) {
          queue.push([remainingTask, time + n]);
        }
      }

      if (queue.length && queue[0][1] === time) {
        const newTask = queue[0][0];
        queue.shift();
        maxHeap.push(newTask);
      }
    }

    return time;
  }
}

const s = new Solution();

console.log(s.leastInterval(["X", "X", "Y", "Y"], 2));
console.log(s.leastInterval(["A", "A", "A", "B", "C"], 3));
