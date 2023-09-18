import { describe, expect, it } from 'vitest';
import '../foreach';

describe('Array.prototype.forEach', () => {
  it('should can iterate', () => {
    const arr = ['q', 'w', 'e'];
    let i = 0;

    arr.mForEach((item, index, array) => {
      expect(item).toBe(arr[i]);
      expect(index).toBe(i);
      expect(array).toBe(arr);
      i++;
    });
  });

  it('should change this', () => {
    class Counter {
      sum: number;
      count: number;
      constructor() {
        this.sum = 0;
        this.count = 0;
      }

      add(array: Array<number>) {
        // 只有函数表达式才有自己的 this 绑定
        array.forEach(function countEntry(this: Counter, entry) {
          this.sum += entry;
          ++this.count;
        }, this);
      }
    }

    const obj = new Counter();
    obj.add([2, 5, 9]);
    expect(obj.count).toBe(3);
    expect(obj.sum).toBe(16);
  });
});
