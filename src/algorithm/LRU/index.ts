export class LRUCache {
  //  容量
  private capacity: number;

  //  缓存表
  private map = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  put(key: any, value: any) {
    if (this.map.has(key))
      this.map.delete(key);

    this.map.set(key, value);

    if (this.map.size > this.capacity) {
      const head = this.map.keys().next();
      this.map.delete(head.value);
    }
  }

  get(key: any) {
    if (this.map.has(key)) {
      const value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
    }

    return this.map.get(key);
  }
}
