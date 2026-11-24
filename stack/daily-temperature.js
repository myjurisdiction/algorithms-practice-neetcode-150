class Solution {
  /**
   * @param {number[]} temperatures
   * @return {number[]}
   */

  // this is the naive approach
  dailyTemperatures(temperatures) {
    const res = Array.from({ length: temperatures.length }).fill(0);
    const n = temperatures.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        const diff = temperatures[j] - temperatures[i];
        if (diff > 0) {
          res[i] = j - i;
          break;
        } else {
          res[i] = 0;
        }
      }
    }

    return res;
  }

  // using the stack -> monotonically decreasing stack and in linear time
  dailyTemperaturesOptimised(temperatures) {
    const res = Array.from({ length: temperatures.length }).fill(0);
    const n = temperatures.length;
    const stack = [];

    for (let i = 0; i < n - 1; i++) {
      const currTemp = temperatures[i];

      while (stack.length && currTemp > stack[stack.length - 1][0]) {
        const prevTempIdx = stack[stack.length - 1][1];
        res[prevTempIdx] = i - prevTempIdx;
        stack.pop();
      }

      stack.push([currTemp, i]);
    }

    return res;
  }
}

const s = new Solution();

const temperatures1 = [30, 38, 30, 36, 35, 40, 28];
const temperatures2 = [22, 21, 20];

console.log(s.dailyTemperaturesOptimised(temperatures1));
console.log(s.dailyTemperaturesOptimised(temperatures2));

/**
 * I need to return an array and i need to return the array containing the integers which represents the future date count at which a higher temprature date will occure
 *.   0.  1.  2.  3. 4.  5.  6
 * [ 30, 38, 30, 36, 35, 40, 28]
 * 
 * stack = [[30, 0]],
 * output = [],
 * i = 0
 * 
 * 
 * stack = [[30, 0]],
 * output = [1, 0, 0, 0, 0, 0, 0],
 * i = 1
 * 
 * 
 * stack = [[38, 1], [30, 2]],
 * output = [1, 0, 0, 0, 0, 0, 0],
 * i = 2
 * 
 *  stack = [[38, 1], [36, 3]],
 * output = [1, 0, 1, 0, 0, 0, 0],
 * i = 3
 * 
 * 
 *  stack = [[38, 1], [36, 3], [35, 4]],
 * output = [1, 0, 1, 0, 0, 0, 0],
 * i = 4
 * 
 * 
 * stack = [[40, 5]],
 * output = [1, 4, 1, 2, 1, 0, 0],
 * i = 5
 * 
 * 
 * stack = [[40, 5], [28, 6]],
 * output = [1, 4, 1, 2, 1, 0, 0],
 * i = 6
  
 */
