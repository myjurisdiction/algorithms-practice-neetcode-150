class MinHeap {
  constructor() {
    this.values = [];
  }

  push(val) {
    /**
     * push the value -> this will be pushed to the end of the array
     * we find the parent of this node.
     * if the node > parent -> break
     * else  -> we swap noe with parent
     * idx = parent and repeat until node finds its correct placement
     */
    this.values.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const last = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (parent < last) break;

      this.values[parentIdx] = last;
      this.values[idx] = parent;
      idx = parentIdx;
    }
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
        if (curr > leftChild) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < n) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild < curr) ||
          (swap !== null && rightChild < leftChild)
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
}

class MaxHeap extends MinHeap {
  constructor() {
    super();
  }

  bubbleUp() {}

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
}

// const minH = new MinHeap();
// const maxH = new MaxHeap();

// minH.push(5);
// minH.push(10);
// minH.push(1);
// minH.push(4);
// minH.push(11);
// minH.push(20);
// minH.push(0);

// minH.pop();
// minH.pop();
// console.dir(minH.values);

// maxH.push(5);
// maxH.push(10);
// maxH.push(1);
// maxH.push(4);
// maxH.push(11);
// maxH.push(20);
// maxH.push(0);

// maxH.pop();
// maxH.pop();
// console.dir(maxH.values);

class Solution {
  /**
   * @param {number[]} prices
   * @return {number}
   */
  maxProfit(prices) {
    let max = 0;
    let left = 0;
    for (let right = 1; right < prices.length; right++) {
      let currentProfit = prices[right] - prices[left];
      if (currentProfit < 0) {
        left = right;
        currentProfit = 0;
      }

      max = Math.max(currentProfit, max);
    }

    return max;
  }

  lengthOfLongestSubstring(s) {
    const set = new Set();
    let left = 0;
    const n = s.length;
    let max = 0;

    for (let right = 0; right < n; right++) {
      const curr = s[right];

      while (set.has(curr)) {
        set.delete(s[left]);
        left++;
      }

      set.add(curr);
      max = Math.max(max, set.size);
    }

    return max;
  }

  characterReplacement(s, k) {
    const n = s.length;
    const window = new Map();
    let left = 0;
    let maxCount = 0;
    let res = 0;

    for (let right = 0; right < n; right++) {
      const curr = s[right];
      const count = (window.get(curr) ?? 0) + 1;
      window.set(curr, count);

      maxCount = Math.max(maxCount, count);

      while (right - left + 1 - maxCount > k) {
        const leftChar = s[left];
        window.set(leftChar, window.get(leftChar) - 1);
        left++;
      }

      res = Math.max(right - left + 1, res);
    }

    return res;
  }

  checkInclusion(s1, s2) {
    const needle = this.hash(s1);
    let left = 0,
      right = s1.length;
    const n = s2.length;

    while (right <= n) {
      const partition = s2.substring(left++, right++);
      const partitionHash = this.hash(partition);

      if (needle === partitionHash) {
        return true;
      }
    }

    return false;
  }

  hash(str) {
    const alphabets = Array.from({ length: 26 }).fill(0);

    for (let char of str) {
      const charCode = char.toLowerCase().charCodeAt() - "a".charCodeAt();
      alphabets[charCode]++;
    }

    return alphabets.join("#");
  }

  minWindow(s, t) {
    const n = s.length;
    const needMap = new Map();

    for (let char of t) {
      const count = (needMap.get(char) ?? 0) + 1;
      needMap.set(char, count);
    }

    const need = needMap.size;
    const window = new Map();
    let have = 0;
    const res = [-1, -1];
    let left = 0;
    let max = Infinity;

    for (let right = 0; right < n; right++) {
      const curr = s[right];
      window.set(curr, (window.get(curr) ?? 0) + 1);

      if (window.get(curr) === needMap.get(curr)) {
        have++;
      }

      while (have === need) {
        // if current window length is less than the max accounted so far and it satifies have === need
        // then capture the left and right pointer values
        if (right - left + 1 < max) {
          max = right - left + 1;
          res[0] = left;
          res[1] = right;
        }
        const leftChar = s[left]; // get the left char
        window.set(leftChar, (window.get(leftChar) ?? 0) - 1); // update the window

        if (window.get(leftChar) < needMap.get(leftChar)) {
          // update have count
          have--;
        }

        left++; // increment the left pointer
      }
    }

    return max === Infinity ? "" : s.substring(res[0], res[1] + 1);
  }

  leastInterval(tasks, n) {}
}

const s = new Solution();

// console.log(s.maxProfit([10, 1, 5, 6, 7, 1]));
// console.log(s.maxProfit([10, 8, 7, 5, 2]));

// console.log(s.lengthOfLongestSubstring("zxyzxyz"));
// console.log(s.lengthOfLongestSubstring("xxxx"));

// console.log(s.characterReplacement("XYYX", 2));
// console.log(s.characterReplacement("AAABABB", 1));
// const s1 = "abc",
//   s2 = "lecabee",
//   s3 = "lecaabee";
// console.log(s.checkInclusion(s1, s3));
// console.log(s.hash("abc"));

// const s1 = "OUZODYXAZV",
//   t = "XYZ";
// console.log(s.minWindow(s1, t));

/**
 * "z x y z x y z" | Set(z, x, y)
 *  l 
 *. r
      r
        r
          r -> curr <- s[r] already in set, while (curr in set) l++
      l     r   -> curr <- s[r] already in set, while (curr in set) l++
        l     r. -> curr <- s[r] already in set, while (curr in set) l++
          
 */
