class Solution {
  /**
   * @param {number[]} gas
   * @param {number[]} cost
   * @return {number}
   */

  // this is the naive approach
  canCompleteCircuit(gas, cost) {
    const n = gas.length;

    if (n !== cost.length) {
      return -1;
    }

    for (let left = 0; left < n; left++) {
      let curr_sum = 0;
      let right = left;
      let count = 0;

      while (count < n) {
        curr_sum += gas[right] - cost[right];

        if (curr_sum < 0) break;

        right = (right + 1) % n;
        count++;
      }

      if (count === n) {
        return left;
      }
    }

    return -1;
  }

  // greedy approach
  canCompleteCircuit_greedy(gas, cost) {
    const n = gas.length;
    let totalGas = 0,
      currentGas = 0;
    let start = 0;

    for (let i = 0; i < n; i++) {
      const diff = gas[i] - cost[i];

      totalGas += diff;
      currentGas += diff;

      if (currentGas < 0) {
        start = i + 1;
        currentGas = 0;
      }
    }

    return totalGas >= 0 ? start : -1;
  }
}

const s = new Solution();

const gas = [1, 2, 3, 4],
  cost = [2, 2, 4, 1];

const gas1 = [1, 2, 3],
  cost1 = [2, 3, 2];

console.log(s.canCompleteCircuit_greedy(gas1, cost1));
console.log(s.canCompleteCircuit_greedy(gas, cost));

/**
 * gas -> [1,2,3,4]
 * cost -> [2,2,4,1]
 *
 * naive approach
 *
 * l = 0, r = 0, c = 1 - 2 = -1 | no
 * l = 1, r = 1, c = 2-2 = 0 | yes, count = 1
 * l = 1, r = 2, c = 3 - 4 = -1 | no, count = 0
 * l = 2, r = 2, c = 3 - 4 = -1 | no, count = 0
 * l = 3, r = 3, c = 4 - 1 = 3 | yes, count = 1
 * l = 3, r = 0, c = 3 + 1 - 2 = 2 | yes, count = 2
 * l = 3, r = 1, c = 2 + 2 - 2 = 2 | yes, count = 3
 * l = 3, r = 2, c = 2 + 3 - 4 = 1 | yes, count = 4
 *
 * count === n -> return
 *
 *
 * // let's work through the greedy approach
 *  gas -> [1,2,3,4]
 * cost -> [2,2,4,1]
 * total_gas(tg), current_gas(cg) = 0
 * start = 0
 *
 * i = 0, diff = 1 - 2 = -1, tg = -1, cg = -1
 *    when cg < 0, cg = 0, start = i + 1 (1)
 * i = 1, diff = 0, tg = -1, cg = 0
 * i = 2, diff = 3 - 4 = -1,tg =  2, cg = 0, start = 3
 * i = 3, diff = 4 - 1 = 3, tg = 2 + 3 = 5, cg = 3,
 *
 * if (tg > 0) return start
 */
