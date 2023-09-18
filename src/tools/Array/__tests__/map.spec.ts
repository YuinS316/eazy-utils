import { describe, expect, it } from 'vitest';
import '../map';

describe('Array.prototype.map', () => {
  it('should can iterate and return a new Array', () => {
    const arr = [1, 2, 3, 4];
    let i = 0;
    const doubleArray = arr.mMap((item, index, array) => {
      expect(index).toBe(i++);
      expect(array).toBe(arr);
      return item * 2;
    });
    expect(doubleArray).toEqual([2, 4, 6, 8]);
  });
});
