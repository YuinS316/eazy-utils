import { describe, expect, it } from 'vitest';
import '../reduce';

describe('Array.prototype.reduce', () => {
  it('should return iterate result when no input initialValue', () => {
    const arr = [1, 2, 3];

    expect(arr.mReduce((pre, cur) => pre + cur)).toBe(6);
  });

  it('should return iterate result when input initialValue', () => {
    const arr = [1, 2, 3];

    expect(arr.mReduce((pre, cur) => pre + cur, 4)).toBe(10);
  });

  it('check callback params', () => {
    const arr = [1, 2, 3];
    let i = 1;
    const result = [null, 1, 3, 6];
    arr.mReduce((pre, cur, index, array) => {
      expect(pre).toBe(result[i]);
      expect(index).toBe(i);
      expect(array).toBe(arr);
      i++;
      return pre + cur;
    });
  });
});
