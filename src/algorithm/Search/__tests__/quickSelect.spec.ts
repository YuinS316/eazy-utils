import { describe, expect, it } from 'vitest';
import { quickSelect } from '../quickSelect';

describe('Quick Select', () => {
  it('should find the k-th smallest element in an unsorted array', () => {
    expect(quickSelect([3, 1, 4, 2, 5], 3)).toBe(3);
    expect(quickSelect([8, 5, 2, 9, 7], 1)).toBe(2);
    expect(quickSelect([8, 5, 2, 9, 7], 5)).toBe(9);
  });

  it('should handle an array with one element', () => {
    expect(quickSelect([5], 1)).toBe(5);
  });

  it('should handle an array with repeated elements', () => {
    expect(quickSelect([3, 1, 4, 2, 5, 4], 3)).toBe(3);
  });

  it('should handle k equal to array length', () => {
    expect(quickSelect([3, 1, 4, 2, 5], 5)).toBe(5);
  });

  it('should handle k equal to 1', () => {
    expect(quickSelect([3, 1, 4, 2, 5], 1)).toBe(1);
  });

  it('should handle k equal to 2', () => {
    expect(quickSelect([3, 1, 4, 2, 5], 2)).toBe(2);
  });

  it('should handle k equal to array length', () => {
    expect(quickSelect([3, 1, 4, 2, 5], 5)).toBe(5);
  });

  it('should handle k greater than array length', () => {
    expect(quickSelect([3, 1, 4, 2, 5], 6)).toBeUndefined();
  });

  it('should handle an empty array', () => {
    expect(quickSelect([], 1)).toBeUndefined();
  });
});
