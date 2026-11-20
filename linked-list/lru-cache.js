class Node {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
    this.left = new Node();
    this.right = new Node();
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  insert(key, value) {
    const newNode = new Node(key, value); // form new node
    const prev = this.right.prev; // get the current node pointed by right pointer
    this.right.prev = newNode; //  put the new node so that right points to it
    prev.next = newNode; // prev node points to newNode
    newNode.next = this.right; // new node next points to right now
    newNode.prev = prev;

    // insert in the cache as well
    this.cache.set(key, newNode);
  }

  remove(node) {
    const toBeRemovedNode = this.cache.get(node.key); // get the node from the cache
    const prev = toBeRemovedNode.prev; // get the prev node pointed by current node
    const upNext = toBeRemovedNode.next; // get the up next node pointed by current node;
    // update links
    prev.next = upNext;
    upNext.prev = prev;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const retrivedNode = this.cache.get(key) ?? null;
    if (retrivedNode) {
      this.remove(retrivedNode);
      this.insert(retrivedNode.key, retrivedNode.value);
      return retrivedNode.value;
    }

    return -1;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key));
    }

    this.insert(key, value);

    if (this.cache.size > this.capacity) {
      const lruNode = this.left.next;
      this.remove(lruNode);
      this.cache.delete(lruNode.key);
    }
  }

  traverseList() {
    let temp = this.left;

    while (temp) {
      console.log({
        key: temp.key,
        value: temp.value,
      });

      temp = temp.next;
    }
  }

  getCache() {
    console.dir(this.cache, { depth: 100 });
  }
}

const lru = new LRUCache(3);

const sampleInput = [
  [1, 2],
  [2, 4],
  [3, 8],
  [4, 16],
  [5, 32],
];

const delay = function () {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

async function runSimulation() {
  for (let item of sampleInput) {
    const [key, value] = item;
    lru.put(key, value);
    lru.traverseList();
    console.log("\n ******** \n");
    await delay();
  }

  for (let item of sampleInput) {
    const [key] = item;
    const result = lru.get(key);
    console.log("[Received value] =>", result, "\n");
    lru.traverseList();
    console.log("\n ******** \n");
    await delay();
  }
}

runSimulation();

/**
 * both get and put needs to happen in contan
 * t time
 *
 * get and put -> Constant time -> Hash map
 *
 * but when the capacity is filled how do i evict the oldest value
 *
 * ex:
 *  const cache = new LRUCache(2)
 *
 * cache.set('a', 'apple') -> { 'a' : 'apple' }, head -> Node('a' : 'apple')
 * cache.set('b', 'ball') -> {'b' : 'ball'}, head -> Node('b', 'ball') ->  Node('a' : 'apple')
 */
