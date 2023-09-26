import { describe, expect, it } from 'vitest';
import { LRUCache } from '../index';

describe('LRU Cache', () => {
  it('should can put and get', () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);

    expect(cache.get(1)).toBe(1);
  });

  it('should delete old keys when capacity is over than limit', () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);

    expect(cache.get(1)).toBe(undefined);
    expect(cache.get(2)).toBe(undefined);
  });

  it('should put will let key to be latest key', () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(2, 4);
    cache.put(4, 4);

    expect(cache.get(2)).toBe(4);
    expect(cache.get(3)).toBe(undefined);
    expect(cache.get(4)).toBe(4);
  });

  it('should get will let key to be latest key', () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);

    cache.get(2);
    cache.put(4, 4);

    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(undefined);
    expect(cache.get(4)).toBe(4);
  });
});
