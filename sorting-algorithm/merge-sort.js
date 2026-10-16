const sampleUnsortedArray = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 30),
);

console.log("Before sort ::\n", sampleUnsortedArray);

class MergeSort {
  mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);

    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid, arr.length));

    return MergeSort.merge(left, right);
  }

  static merge(arr1, arr2) {
    const result = [];

    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }

    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }

    return result;
  }
}

const ms = new MergeSort();

console.log("After sort ::", ms.mergeSort(sampleUnsortedArray));
