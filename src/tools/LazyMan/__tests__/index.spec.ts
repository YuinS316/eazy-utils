import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LazyMan } from '../index';

describe('LazyMan', () => {
  let resultLog: string[] = [];
  beforeEach(() => {
    resultLog = [];
    vi.spyOn(console, 'log').mockImplementation((string) => {
      resultLog.push(string);
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create instance will log', () => {
    const p = new LazyMan('Hank');
    expect(resultLog).toEqual(['This is Hank']);
  });

  it('should implement eat method', () => {
    const p = new LazyMan('Hank').eat('dinner');
    vi.advanceTimersToNextTimer();
    expect(resultLog).toEqual(['This is Hank', 'eat dinner']);
  });

  it('should support chain call', () => {
    const p = new LazyMan('Hank').eat('dinner').eat('lunch');
    vi.advanceTimersToNextTimer();
    expect(resultLog).toEqual(['This is Hank', 'eat dinner', 'eat lunch']);
  });

  it('should support sleep method', () => {
    const p = new LazyMan('Hank').sleep(1000).eat('dinner');
    expect(resultLog).toEqual(['This is Hank']);
    vi.advanceTimersToNextTimer();
    expect(resultLog).toEqual(['This is Hank']);
    vi.advanceTimersToNextTimer();
    expect(resultLog).toEqual(['This is Hank', 'eat dinner']);
  });

  it('should support sleepFirst method', () => {
    const p = new LazyMan('Hank').eat('dinner').sleepFirst(1000);
    expect(resultLog).toEqual(['This is Hank']);
    vi.advanceTimersToNextTimer();
    expect(resultLog).toEqual(['This is Hank']);
    vi.advanceTimersToNextTimer();
    expect(resultLog).toEqual(['This is Hank', 'eat dinner']);
  });
});
