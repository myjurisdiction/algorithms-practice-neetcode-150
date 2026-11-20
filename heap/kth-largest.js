class MinHeap {
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

      if (parent <= el) {
        break;
      }

      this.values[parentIdx] = el;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const currMin = this.values[0];
    const lastEl = this.values[this.values.length - 1];
    this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = lastEl;
      this.sinkDown();
    }

    return currMin;
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
        if (el > leftChild) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < n) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === undefined && el > rightChild) ||
          (swap !== undefined && rightChild < leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === undefined) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = el;
      idx = swap;
    }
  }

  size() {
    return this.values.length;
  }

  front() {
    return this.values[0];
  }
}

class KthLargest {
  /**
   * @param {number} k
   * @param {number[]} nums
   */
  constructor(k, nums) {
    this.minHeap = new MinHeap();
    this.k = k;

    for (let item of nums) {
      this.minHeap.insert(item);
    }

    while (this.minHeap.size() > k) {
      this.minHeap.extractMax();
    }
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val) {
    this.minHeap.insert(val);

    while (this.minHeap.size() > this.k) {
      this.minHeap.extractMax();
    }

    return this.minHeap.front();
  }
}

class KthLargestInArray {
  findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    for (let num of nums) {
      minHeap.insert(num);
      if (minHeap.size() > k) {
        minHeap.extractMax();
      }
    }
    return minHeap.front();
  }
}

// const kl = new KthLargest(3, [1, 2, 3, 3]);
// console.log(kl.add(3)); // return 3
// console.log(kl.add(5)); // return 3
// console.log(kl.add(6)); // return 3
// console.log(kl.add(7)); // return 5
// console.log(kl.add(8)); // return 6

const kl = new KthLargestInArray();
console.log(kl.findKthLargest([2, 3, 1, 5, 4], 2));
