class MinStack {
  constructor() {
    this.min = [];
    this.stack = [];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    if (this.stack.length === 0) {
      this.min.push(val);
    } else {
      const currentMin = this.getMin();

      if (val <= currentMin) {
        this.min.push(val);
      } else {
        this.min.push(currentMin);
      }
    }

    this.stack.push(val);
  }

  /**
   * @return {void}
   */
  pop() {
    this.stack.pop();
    this.min.pop();
  }

  /**
   * @return {number}
   */
  top() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * @return {number}
   */
  getMin() {
    return this.min[this.min.length - 1];
  }
}

const minStack = new MinStack();

minStack.push(1);
minStack.push(2);
minStack.push(0);
console.log(minStack.getMin());
minStack.pop();
console.log(minStack.top()); // return 2
console.log(minStack.getMin()); // return 1
