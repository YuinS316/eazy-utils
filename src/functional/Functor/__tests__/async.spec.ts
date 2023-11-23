import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Async } from '../async';
import type { MaybeFunctor } from '../maybe';
import { add4 } from './helper';

describe('async functor', () => {
  function asyncResolve(): Promise<number> {
    return new Promise((resolve) => {
      resolve(100);
    });
  }

  function asyncReject() {
    return new Promise((resolve, reject) => {
      reject(new Error('err'));
    });
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should support async', async () => {
    const box = Async(asyncResolve);

    await vi.advanceTimersToNextTimerAsync();

    const isEq = (m: any) => m.valueOf() === 100;
    expect(box).resolves.toSatisfy(isEq);
  });

  it('should get Maybe<null> when async failed', async () => {
    const box = Async(asyncReject);

    await vi.advanceTimersToNextTimerAsync();

    const isEq = (m: any) => m.valueOf() === null;
    expect(box).resolves.toSatisfy(isEq);
  });

  it('should support sync chain', () => {
    Async(asyncResolve).then((box) => {
      expect(box.valueOf()).toBe(100);

      return (box as MaybeFunctor<number>).map(add4);
    }).then((box) => {
      expect(box.valueOf()).toBe(104);
    });
  });

  it('should support async chain', () => {
    Async(asyncResolve).then((box) => {
      expect(box.valueOf()).toBe(100);

      return (box as MaybeFunctor<number>).map(add4);
    }).then((box) => {
      expect(box.valueOf()).toBe(104);

      return Async(asyncResolve);
    }).then((box) => {
      expect(box.valueOf()).toBe(100);
    });
  });
});
