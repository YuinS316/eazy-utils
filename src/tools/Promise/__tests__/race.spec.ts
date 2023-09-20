import { describe, expect, it } from 'vitest';
import '../race';

describe('Promise.race', () => {
  it('when input non-promise should work', () => {
    const arr = [
      1, 2, 3,
    ];

    expect(Promise.mRace(arr)).resolves.toBe(1);
  });

  it('when input promise should work', () => {
    const arr = [
      Promise.resolve(1), 2, 3,
    ];

    expect(Promise.mRace(arr)).resolves.toBe(1);
  });

  it('should return rejected when meet reject first', () => {
    const arr = [
      Promise.reject(new Error('test')), 2, 3,
    ];

    expect(Promise.mRace(arr)).rejects.toThrow('test');
  });
});
