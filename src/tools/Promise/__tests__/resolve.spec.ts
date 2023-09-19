import { describe, expect, it, test } from 'vitest';

import '../resolve';

describe('Promise.resolve', () => {
  it('should return Promise', () => {
    expect(Promise.mResolve(1) instanceof Promise).toBe(true);
  });

  test('test resolve non-promise', async () => {
    const value = 1;

    expect(Promise.resolve(value)).resolves.toBe(value);
    expect(Promise.mResolve(value)).resolves.toBe(value);
  });

  test('test resolve promise', () => {
    const p = new Promise(resolve => resolve(1));

    //  如果传入Promise, 回原样输出
    expect(Promise.resolve(p)).toBe(p);
    expect(Promise.mResolve(p)).toBe(p);

    expect(Promise.resolve(p)).resolves.toBe(1);
    expect(Promise.mResolve(p)).resolves.toBe(1);
  });
});
