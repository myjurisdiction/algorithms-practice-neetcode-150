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

  getValues() {
    return this.values;
  }
}

const mh = new MaxHeap();

const input1 = [3, 9, 2, 1, 4, 5];
const input2 = [10, 20, 15, 30, 40];

for (let item of input1) {
  mh.insert(item);
}

console.log(mh.getValues());

console.log(mh.extractMax());

console.log(mh.getValues());

console.log(mh.extractMax());

console.log(mh.getValues());
