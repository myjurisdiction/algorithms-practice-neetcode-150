class Solution {
  /**
   * @param {number[]} piles
   * @param {number} h
   * @return {number}
   */
  // brute_forece approach -> linear search
  minEatingSpeed(piles, h) {
    let speed = 1; // because minimun rate at which banana can be eater is 1
    let totalSpeed = undefined;

    while (true) {
      totalSpeed = 0;

      for (let pile of piles) {
        totalSpeed += Math.ceil(pile / speed);
      }

      if (totalSpeed <= h) {
        // this means i was able to finish all the piles before or equal to the designated hour
        return speed;
      }

      speed++;
    }
  }

  // using binary search approach
  minEatingSpeedBinarySearch(piles, h) {
    let totalSpeed = undefined;

    let speed = undefined;
    let left = 1,
      right = Math.max(...piles);
    let result = right;

    while (left <= right) {
      speed = Math.floor((left + right) / 2);
      totalSpeed = 0;

      for (let pile of piles) {
        totalSpeed += Math.ceil(pile / speed);
      }

      if (totalSpeed <= h) {
        // we should go left in the speed array to find the minimum rate
        result = speed;
        right = speed - 1;
      } else {
        // else go right
        left = speed + 1;
      }
    }

    return result;
  }
}

const s = new Solution();

// console.log(s.minEatingSpeed([1, 4, 3, 2], 9));
// console.log(s.minEatingSpeed([25, 10, 23, 4], 4));

console.log(s.minEatingSpeedBinarySearch([1, 4, 3, 2], 9));
console.log(s.minEatingSpeedBinarySearch([25, 10, 23, 4], 4));
