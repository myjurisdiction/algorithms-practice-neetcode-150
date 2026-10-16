const sampleUnsortedArray = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 30),
);

console.log(sampleUnsortedArray);

/** Quick sort algorithm
 * Avg TC : O(nlogn) where n is the size of the array
 * Worst case (When array is already sorted) -> O()
 */

class QuickSort {
  static partition(arr, low, high) {
    let left = low,
      right = high;
    // Hoare-style partitioning
    const mid = left + Math.floor((right - left) / 2);
    const pivot = arr[mid];

    while (left <= right) {
      while (arr[left] < pivot) left++;
      while (arr[right] > pivot) right--;

      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }

    return left;
  }

  quickSort(arr, low = 0, high = null) {
    if (high == null) {
      high = arr.length - 1;
    }

    if (low >= high) {
      return arr;
    }

    const split = QuickSort.partition(arr, low, high);
    this.quickSort(arr, low, split - 1);
    this.quickSort(arr, split, high);

    return arr;
  }
}

const qs = new QuickSort();

console.log(qs.quickSort(sampleUnsortedArray));
console.log(sampleUnsortedArray);
