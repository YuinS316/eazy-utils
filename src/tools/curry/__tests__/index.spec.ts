import { describe, expect, it } from 'vitest';
import { curry } from '../index';

describe('curry', () => {
  function add(a: number, b: number, c: number) {
    return a + b + c;
  }
  it('test fn(1,2,3)', () => {
    const fn = curry(add);
    expect(fn(1, 2, 3)).toBe(6);
  });

  it('test fn(1,2)(3)', () => {
    const fn = curry(add);
    expect(fn(1, 2)(3)).toBe(6);
  });

  it('test fn(1)(2)(3)', () => {
    const fn = curry(add);
    expect(fn(1)(2)(3)).toBe(6);
  });
  it('test fn()(1)(2,3)', () => {
    const fn = curry(add);
    expect(fn()(1)(2, 3)).toBe(6);
  });
});
