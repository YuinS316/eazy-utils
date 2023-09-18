import { describe, expect, it } from 'vitest';
import { uniq } from '../uniq';

describe('uniq', () => {
  it('should work', () => {
    const arr = [-1, -1, 0, 0, 0, 1, 2, 3, 1, -100];
    const uniqArr = uniq(arr);

    expect(uniqArr).toEqual([-1, 0, 1, 2, 3, -100]);
  });
});
