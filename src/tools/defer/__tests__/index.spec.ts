import { beforeEach, describe, expect, it, vi } from 'vitest';
import { afterEach } from 'node:test';
import { defer } from '..';

describe('defer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should suupport noraml function', () => {
    let count = 1;
    const add = () => {
      count += 1;
    };
    defer((_) => {
      add();
    });
    expect(count).toBe(2);
  });

  it('should return result', async () => {
    let count = 1;
    const add = () => {
      count += 1;
      return count;
    };
    const res = await defer<number>(() => add());
    expect(res).toBe(2);
  });

  it('should support async function', async () => {
    let count = 1;

    const res = await defer(async () => {
      setTimeout(() => {
        count += 100;
      }, 100);

      await vi.advanceTimersToNextTimerAsync();

      expect(count).toBe(101);

      return count;
    });

    expect(res).toBe(101);
  });

  it('should execute cleanup', async () => {
    let count = 1;

    await defer((cleanup) => {
      cleanup(() => {
        count += 1;
      });
    });

    expect(count).toBe(2);
  });

  it('should execute all cleanup', async () => {
    let count = 1;
    let foo = 1;
    let bar = 1;

    await defer((cleanup) => {
      cleanup(() => {
        count += 1;
      });

      cleanup(() => {
        foo += 10;
      });

      cleanup(() => {
        bar += 100;
      });
    });

    expect(count).toBe(2);
    expect(foo).toBe(11);
    expect(bar).toBe(101);
  });

  it('should execute cleanup after main function finished', async () => {
    const foo = vi.fn(() => Promise.resolve(1));
    const bar = vi.fn();

    await defer(async (cleanup) => {
      cleanup(() => {
        bar();
      });

      const res = await foo();

      expect(foo).toBeCalled();
      expect(res).toBe(1);
      expect(bar).not.toBeCalled();
    });

    expect(bar).toBeCalled();
  });
});
