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

      if (el[0] <= parent[0]) {
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
        if (leftChild[0] > el[0]) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < n) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === undefined && rightChild[0] > el[0]) ||
          (swap !== undefined && rightChild[0] > leftChild[0])
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

  get size() {
    return this.values.length;
  }
}

class Solution {
  /**
   * @param {number} target
   * @param {number[]} position
   * @param {number[]} speed
   * @return {number}
   */

  // this is the max heap approach and its run time will be -> n log n
  carFleet(target, position, speed) {
    const n = position.length;
    const maxHeap = new MaxHeap();

    for (let i = 0; i < n; i++) {
      maxHeap.insert([position[i], speed[i]]);
    }

    let fleets = 0;
    let maxTime = 0;

    while (maxHeap.size) {
      const [position, speed] = maxHeap.extractMax();
      const timeToReachTarget = (target - position) / speed;

      if (timeToReachTarget > maxTime) {
        fleets++;
        maxTime = timeToReachTarget;
      }
    }

    return fleets;
  }
}

const s = new Solution();

// const target = 10,
//   position = [4, 1, 0, 7],
//   speed = [2, 2, 1, 1];

// const target1 = 10
//   position1 = [1, 4],
//   speed1 = [3, 2];

const target = 12;
position = [10, 8, 0, 5, 3];
speed = [2, 4, 1, 1, 3];

console.log(s.carFleet(target, position, speed));
// console.log(s.carFleet(target1, position1, speed1));
