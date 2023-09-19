import { describe, expect, it, test } from 'vitest';

import '../reject';

describe('Promise.reject', () => {
  it('should return Promise', () => {
    expect(Promise.mReject('test') instanceof Promise).toBe(true);
  });

  test('test reject non-promise', async () => {
    const value = new Error('test');

    expect(Promise.reject(value)).rejects.toThrow(value);
    expect(Promise.mReject(value)).rejects.toThrow(value);
  });
});
