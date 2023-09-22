import { describe, expect, it } from 'vitest';
import { bubbleSort } from '../bubbleSort';

describe('bubble sort', () => {
  it('should asc', () => {
    const arr = [100, 9, 10, -1, -1, 0, 1, 2];
    bubbleSort (arr);
    expect(arr).toEqual(arr.sort());
  });
});
