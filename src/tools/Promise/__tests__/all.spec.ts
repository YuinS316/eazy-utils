import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '../all';

describe('Promise.all', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should support non-promise', () => {
    const arr = [1, 2, 3];
    expect(Promise.mAll(arr)).resolves.toEqual([1, 2, 3]);
  });

  it('should support promise', () => {
    const arr = [
      Promise.resolve(1),
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        });
      }),
      3,
    ];

    vi.advanceTimersToNextTimer();
    expect(Promise.mAll(arr)).resolves.toEqual([1, 2, 3]);
  });

  it('should throw the first rejected promise', () => {
    const arr = [
      Promise.resolve(1),
      Promise.reject(new Error('test')),
      Promise.resolve(3),
      Promise.reject(new Error('qwer')),
    ];

    expect(Promise.mAll(arr)).rejects.toThrow('test');
  });
});
