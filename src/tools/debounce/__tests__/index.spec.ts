import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '../index';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute when timeout', async () => {
    const fn = vi.fn();

    const wrapperFn = debounce(fn, 100);

    wrapperFn();

    await vi.advanceTimersByTimeAsync(100);

    expect(fn).toBeCalledTimes(1);
  });

  it('should restart calculate time when call repeat in limit time', async () => {
    const fn = vi.fn();

    const wrapperFn = debounce(fn, 100);

    wrapperFn();

    await vi.advanceTimersByTimeAsync(50);
    wrapperFn();

    await vi.advanceTimersByTimeAsync(50);
    expect(fn).not.toBeCalled();

    await vi.advanceTimersByTimeAsync(50);

    expect(fn).toBeCalledTimes(1);
  });

  it('should execute function immediately when set immediate=true', async () => {
    const fn = vi.fn();

    const wrapperFn = debounce(fn, 100, true);

    wrapperFn();
    wrapperFn();
    expect(fn).toBeCalledTimes(1);

    await vi.advanceTimersByTimeAsync(100);
    expect(fn).toBeCalledTimes(2);
  });

  it('should wrapper function can receive params', () => {
    const fn = vi.fn((name: string, age: number) => {});

    const wrapperFn = debounce(fn, 100);

    wrapperFn('alan', 18);

    vi.advanceTimersToNextTimer();

    expect(fn).toBeCalledWith('alan', 18);
  });
});
