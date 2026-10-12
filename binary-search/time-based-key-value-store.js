class TimeMap {
  constructor() {
    this.keyStore = new Map();
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @return {void}
   */
  set(key, value, timestamp) {
    const valueList = this.keyStore.get(key) ?? [];
    valueList.push([value, timestamp]);
    this.keyStore.set(key, valueList);
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   */
  get(key, timestamp) {
    const valueList = this.keyStore.get(key) ?? [];

    if (!valueList.length) {
      return "";
    }

    let left = 0,
      right = valueList.length - 1;
    let mid = undefined;

    while (left <= right) {
      mid = left + Math.floor((right - left) / 2);

      if (timestamp === valueList[mid][1]) {
        return valueList[mid][0];
      }

      if (timestamp < valueList[mid][1]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    const index = left - 1;
    return index >= 0 ? valueList[index][0] : "";
  }
}

const s = new TimeMap();

s.set("foo", "first", 1);
s.set("foo", "fourth", 4);
s.set("foo", "nineth", 9);
s.set("foo", "hundreth", 100);
s.set("foo", "hundred-o-five", 105);

console.dir(s, { depth: 5 });

console.log(s.get("foo", 11));
console.log(s.get("foo", 109));
