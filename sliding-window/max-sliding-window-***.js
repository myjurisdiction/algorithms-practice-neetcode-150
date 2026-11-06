class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */

  constructor() {
    this.queue = [];
    this.head = 0;
  }

  // brute force approach
  maxSlidingWindow(nums, k) {
    const maxFromChunks = [];

    let left = 0;

    for (let right = k - 1; right < nums.length; right++) {
      maxFromChunks.push(this.findMax(nums, left++, right));
    }

    return maxFromChunks;
  }

  // This is the bottle neck for the brute force approach
  // let's find a way to tackle this efficienty
  findMax(arr, left, right) {
    let max = -Infinity;

    for (let i = left; i <= right; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }

    return max;
  }

  maxSlidingWindowOptimised(nums, k) {
    const result = [];
    const deque = []; // Stores indices
    let head = 0;

    for (let right = 0; right < nums.length; right++) {
      const left = right - k + 1;

      // 1. Remove indices outside the window.
      while (head < deque.length && deque[head] < left) {
        head++;
      }

      // 2. Remove smaller elements from the back.
      while (
        deque.length > head &&
        nums[deque[deque.length - 1]] <= nums[right]
      ) {
        deque.pop();
      }

      // 3. Insert the current index.
      deque.push(right);

      // 4. Record maximum after first complete window.
      if (right >= k - 1) {
        result.push(nums[deque[head]]);
      }
    }

    return result;
  }

  enqueue(item) {
    if (arguments.length === 0) {
      throw Error("Invalid argument !!");
    }
    this.queue.push(item);
    return item;
  }

  dequeue() {
    if (!this.queue.length) {
      return undefined;
    }

    return this.queue[this.head++];
  }

  queueLength() {
    return this.queue.length - this.head;
  }

  // returns the first item in the uqueue
  peek() {
    return !this.queueLength() ? undefined : this.queue[this.head];
  }

  print() {
    for (let i = this.head; i < this.queue.length; i++) {
      console.log(this.queue[i]);
    }
  }
}

const s = new Solution();

console.log(s.maxSlidingWindowOptimised([1, 2, 1, 0, 4, 2, 6], 3));
// console.log(s.maxSlidingWindow([1, -1], 1));

// s.enqueue(100);
// s.enqueue(200);
// s.enqueue(300);
// s.enqueue(400);
// s.enqueue(500);
// s.enqueue(600);

// s.dequeue();
// s.dequeue();
// s.dequeue();

// s.print();

// console.log(s.queueLength());
