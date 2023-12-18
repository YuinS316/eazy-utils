import { beforeEach, describe, expect, it } from 'vitest';

import { MaxHeap } from '../maxHeap';

describe('Min Heap', () => {
  let maxHeap: MaxHeap;

  beforeEach(() => {
    maxHeap = new MaxHeap();
  });

  it('should can insert element', () => {
    maxHeap.insert(2);
    expect(maxHeap.peek()).toBe(2);
    expect(maxHeap.size()).toBe(1);
  });

  it('should heapifyUp work', () => {
    maxHeap.insert(1);
    maxHeap.insert(4);
    maxHeap.insert(5);
    expect(maxHeap.heap).toEqual([5, 1, 4]);
    maxHeap.insert(2);
    expect(maxHeap.heap).toEqual([5, 2, 4, 1]);
    maxHeap.insert(0);
    expect(maxHeap.heap).toEqual([5, 2, 4, 1, 0]);
    maxHeap.insert(3);
    expect(maxHeap.heap).toEqual([5, 2, 4, 1, 0, 3]);
  });

  it('should heapiDown work', () => {
    maxHeap.insert(1);
    maxHeap.insert(4);
    maxHeap.insert(5);
    maxHeap.insert(2);
    maxHeap.insert(0);
    maxHeap.insert(3);

    maxHeap.pop();
    expect(maxHeap.heap).toEqual([4, 2, 3, 1, 0]);
  });
});
