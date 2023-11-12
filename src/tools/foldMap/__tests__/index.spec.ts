import { describe, expect, it } from 'vitest';
import { foldMap } from '../index';
import { Add } from '@/functional/Abstract/monoid';

describe('foldMap', () => {
  it('should make array elements to be Monoid', () => {
    const res = foldMap(Add, [1, 2, 3, 4]);
    expect(res.value).toBe(10);
  });
});
