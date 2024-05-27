class HashMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  _getBucketAndIndex(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return { bucket, index: i };
      }
    }
    return { bucket, index: -1 };
  }

  set(key, value) {
    const { bucket, index } = this._getBucketAndIndex(key);
    if (index !== -1) {
      bucket[index][1] = value;
    } else {
      bucket.push([key, value]);
      this.size++;
    }
  }

  get(key) {
    const { bucket, index } = this._getBucketAndIndex(key);
    if (index !== -1) {
      return bucket[index][1];
    }
    return undefined;
  }

  has(key) {
    const { bucket, index } = this._getBucketAndIndex(key);
    return index !== -1;
  }

  remove(key) {
    const { bucket, index } = this._getBucketAndIndex(key);
    if (index !== -1) {
      bucket.splice(index, 1); // Remove the key-value pair from the bucket
      this.size--; // Decrement the size of the hashmap
    }
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    let keysArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let x = 0; x < this.buckets[i].length; x++) {
        keysArray.push(this.buckets[i][x][0]); // Use this.buckets
      }
    }
    return keysArray;
  }

  values() {
    let valuesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let x = 0; x < this.buckets[i].length; x++) {
        valuesArray.push(this.buckets[i][x][1]); // Use this.buckets
      }
    }
    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let x = 0; x < this.buckets[i].length; x++) {
        entriesArray.push(this.buckets[i][x]); // Use this.buckets
      }
    }
    return entriesArray;
  }
}
