import { describe, expect, it } from 'vitest';
import { compose } from '../index';

describe('compose', () => {
  it('no input function should return a function that will return arg', () => {
    const fn = compose();

    expect(fn(1)).toBe(1);
  });

  it('only one input function should return that function', () => {
    const fn1 = (x: number) => x + 1;

    const fn = compose(fn1);

    expect(fn(1)).toBe(2);
  });

  it('should execute functions from right to left', () => {
    const fn1 = (x: number) => x + 100;
    const fn2 = (x: number) => x * 2;

    const fn = compose(fn1, fn2);
    expect(fn(2)).toBe(104);
  });
});
