import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import concurrentLimit from '../index';

describe('concurrent limit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should work', () => {
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

    const p4 = cLimit(() => createTask(4000));

    vi.advanceTimersByTime(2000);
    expect(p1).resolves.toBe(0);
    expect(p2).resolves.toBe(1);
    // expect(p3).not.resolves.toBe(2);
  });
});
