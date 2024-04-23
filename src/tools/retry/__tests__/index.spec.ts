import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { retry } from '..';

const fail = () => Promise.reject(new Error('fail'));
const succ = () => Promise.resolve(1);

describe('retry', () => {
  it('should return result when async function success', () => {
    const foo = vi.fn(succ);

    expect(retry(foo)).resolves.toBe(1);
  });

  it('should throw error when retry times less than zero', () => {
    const foo = vi.fn(fail);

    expect(retry(foo)).rejects.toThrow();
  });

  it('should return result when retry times large than zero', () => {
    let count = 3;
    const foo = vi.fn(() => {
      if (count >= 1) {
        count--;
        return Promise.reject(new Error('fail'));
      }

      return Promise.resolve(count);
    });

    expect(retry(foo)).resolves.toBe(0);
  });
});
