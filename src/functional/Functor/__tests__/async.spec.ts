import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Async } from '../async';
import type { MaybeFunctor } from '../maybe';
import { Maybe } from '../maybe';

describe('async functor', () => {
  function sleepReturn() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(100);
      }, 1000);
    });
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should support async', async () => {
    const box = Async(sleepReturn);

    await vi.advanceTimersToNextTimerAsync();
    const isEq = (m: any) => m.valueOf() === 200;
    expect(box).resolves.toSatisfy(isEq);
  });
});
