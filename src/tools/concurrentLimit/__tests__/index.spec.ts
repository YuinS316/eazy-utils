import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import concurrentLimit from '../index';

describe('concurrent limit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should work', async () => {
    let id = 0;

    const createTask = (timeout: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id++);
        }, timeout);
      });
    };

    const cLimit = concurrentLimit(2);
    const p1 = cLimit(() => createTask(1000));
    const p2 = cLimit(() => createTask(2000));
    const p3 = cLimit(() => createTask(3000));

    //  如果没有并发限制的话，前进到第3000毫秒，此时三个都已经resolve
    //  但是存在了并发限制，p3会在第1000毫秒启动，于第4000毫秒resolve
    await vi.advanceTimersByTimeAsync(3000);
    expect(p1).resolves.toBe(0);
    expect(p2).resolves.toBe(1);
    expect(vi.getTimerCount()).toBe(1);
    await vi.advanceTimersByTimeAsync(1000);
    expect(p3).resolves.toBe(2);
  });
});
