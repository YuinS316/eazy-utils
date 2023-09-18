import { describe, expect, it, vi } from 'vitest';
import { flat } from '../flat';

describe('flat', () => {
  it('should flatten one layer', () => {
    const arr = [1, [2, [3, 4], 5]];
    expect(flat(arr)).toEqual([1, 2, [3, 4], 5]);
  });

  it('should flatten two layer', () => {
    const arr = [1, [2, [3, 4], 5]];
    expect(flat(arr, 2)).toEqual([1, 2, 3, 4, 5]);
  });
});
