import type { Mock } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { throttle } from '../index';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('leading = true, trailing = true', () => {
    let fn: Mock;
    let wrapperFn: Function;

    beforeEach(() => {
      fn = vi.fn();

      wrapperFn = throttle(fn, 100);
    });

    it('should call imediate and call after timeout', async () => {
      wrapperFn();

      expect(fn).toBeCalledTimes(1);

      await vi.advanceTimersToNextTimerAsync();

      expect(fn).toBeCalledTimes(2);
    });

    it('should exactly call 2 times when call several times in limit time', async () => {
      wrapperFn();
      wrapperFn();

      await vi.advanceTimersByTimeAsync(50);
      wrapperFn();

      await vi.advanceTimersByTimeAsync(50);

      expect(fn).toBeCalledTimes(2);
    });
  });

  describe('leading = true, trailing = false', () => {
    let fn: Mock;
    let wrapperFn: Function;

    beforeEach(() => {
      fn = vi.fn();

      wrapperFn = throttle(fn, 100, true, false);
    });

    it('should call imediate but not call after timeout', async () => {
      wrapperFn();

      expect(fn).toBeCalledTimes(1);

      await vi.advanceTimersToNextTimerAsync();

      expect(fn).toBeCalledTimes(1);
    });

    it('should exactly call 1 times when call several times in limit time', async () => {
      wrapperFn();
      wrapperFn();

      await vi.advanceTimersByTimeAsync(50);
      wrapperFn();

      await vi.advanceTimersByTimeAsync(50);

      expect(fn).toBeCalledTimes(1);
    });
  });

  describe('leading = false, trailing = true', () => {
    let fn: Mock;
    let wrapperFn: Function;

    beforeEach(() => {
      fn = vi.fn();

      wrapperFn = throttle(fn, 100, false, true);
    });

    it('should not call imediate but call after timeout', async () => {
      wrapperFn();

      expect(fn).toBeCalledTimes(0);

      await vi.advanceTimersToNextTimerAsync();

      expect(fn).toBeCalledTimes(1);
    });

    it('should exactly call 1 times when call several times in limit time', async () => {
      wrapperFn();
      wrapperFn();

      await vi.advanceTimersByTimeAsync(50);
      wrapperFn();

      await vi.advanceTimersByTimeAsync(50);

      expect(fn).toBeCalledTimes(1);
    });
  });
});
