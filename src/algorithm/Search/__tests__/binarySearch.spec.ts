import { describe, expect, it } from 'vitest';
import { binarySearch } from '../binarySearch';

describe('Binary Search', () => {
  it('should find the target element in a sorted array', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  it('should return -1 for a target not in the array', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 6)).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    expect(binarySearch([], 1)).toBe(-1);
  });

  it('should handle an array with one element', () => {
    expect(binarySearch([5], 5)).toBe(0);
    expect(binarySearch([5], 3)).toBe(-1);
  });

  it('should handle an array with repeated elements', () => {
    expect(binarySearch([1, 2, 2, 3, 4, 5], 2)).toBe(2);
  });
});
