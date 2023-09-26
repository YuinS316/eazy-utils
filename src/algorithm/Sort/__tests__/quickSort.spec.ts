import { describe, expect, it } from 'vitest';
import { quickSortV1, quickSortV2 } from '../quickSort';

describe('quickSort', () => {
  describe('v1 return new Array', () => {
    it('should correctly sort an empty array', () => {
      const emptyArray: number[] = [];
      const sortedArray = quickSortV1(emptyArray);
      expect(sortedArray).toEqual([]);
    });

    it('should correctly sort an array with one element', () => {
      const singleElementArray = [42];
      const sortedArray = quickSortV1(singleElementArray);
      expect(sortedArray).toEqual([42]);
    });

    it('should correctly sort an array with duplicate elements', () => {
      const arrayWithDuplicates = [5, 3, 7, 2, 8, 4, 3, 1, 2];
      const sortedArray = quickSortV1(arrayWithDuplicates);
      expect(sortedArray).toEqual([1, 2, 2, 3, 3, 4, 5, 7, 8]);
    });

    it('should correctly sort a large array', () => {
      const largeArray = [];
      for (let i = 1000; i > 0; i--)
        largeArray.push(i);

      const sortedArray = quickSortV1(largeArray);
      expect(sortedArray).toEqual([...Array(1000)].map((_, index) => index + 1));
    });
  });

  describe('v2 using double pointer', () => {
    it('should correctly sort an empty array', () => {
      const emptyArray: number[] = [];
      const sortedArray = quickSortV2(emptyArray);
      expect(sortedArray).toEqual([]);
    });

    it('should correctly sort an array with one element', () => {
      const singleElementArray = [42];
      const sortedArray = quickSortV2(singleElementArray);
      expect(sortedArray).toEqual([42]);
    });

    it('should correctly sort an array with duplicate elements', () => {
      const arrayWithDuplicates = [5, 3, 7, 2, 8, 4, 3, 1, 2];
      const sortedArray = quickSortV2(arrayWithDuplicates);
      expect(sortedArray).toEqual([1, 2, 2, 3, 3, 4, 5, 7, 8]);
    });

    it('should correctly sort a large array', () => {
      const largeArray = [];
      for (let i = 1000; i > 0; i--)
        largeArray.push(i);

      const sortedArray = quickSortV2(largeArray);
      expect(sortedArray).toEqual([...Array(1000)].map((_, index) => index + 1));
    });
  });
});
