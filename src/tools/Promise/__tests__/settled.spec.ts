import { describe, expect, it } from 'vitest';
import '../allSettled';

describe('Promise.settled', () => {
  it('should return all promise result', () => {
    const p = [
      Promise.resolve(1),
      Promise.reject(new Error('test')),
    ];

    expect(Promise.mAllSettled(p)).resolves.toEqual([
      {
        status: 'fulfilled',
        value: 1,
      },
      {
        status: 'rejected',
        reason: new Error('test'),
      },
    ]);
  });

  it('should support non-promise', () => {
    const p = [
      0,
      Promise.resolve(1),
      Promise.reject(new Error('test')),
    ];

    expect(Promise.mAllSettled(p)).resolves.toEqual([
      {
        status: 'fulfilled',
        value: 0,
      },
      {
        status: 'fulfilled',
        value: 1,
      },
      {
        status: 'rejected',
        reason: new Error('test'),
      },
    ]);
  });
});
