import { beforeEach, describe, expect, it } from 'vitest';

import { MinHeap } from '../minHeap';

describe('Min Heap', () => {
  let minHeap: MinHeap;

  beforeEach(() => {
    minHeap = new MinHeap();
  });

  it('should can insert element', () => {
    minHeap.insert(2);
    expect(minHeap.peek()).toBe(2);
    expect(minHeap.size()).toBe(1);
  });

  it('should heapifyUp work', () => {
    minHeap.insert(1);
    minHeap.insert(4);
    minHeap.insert(5);
    expect(minHeap.heap).toEqual([1, 4, 5]);
    minHeap.insert(2);
    expect(minHeap.heap).toEqual([1, 2, 5, 4]);
    minHeap.insert(0);
    expect(minHeap.heap).toEqual([0, 1, 5, 4, 2]);
    minHeap.insert(3);
    expect(minHeap.heap).toEqual([0, 1, 3, 4, 2, 5]);
  });

  it('should heapiDown work', () => {
    minHeap.insert(1);
    minHeap.insert(4);
    minHeap.insert(5);
    minHeap.insert(2);
    minHeap.insert(0);
    minHeap.insert(3);

    minHeap.pop();
    expect(minHeap.heap).toEqual([1, 2, 3, 4, 5]);
  });
});
