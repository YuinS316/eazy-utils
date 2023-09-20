import { describe, expect, it } from 'vitest';
import { mInstanceof } from '../index';

describe('instanceof', () => {
  it('should return true when checking an object created by new class', () => {
    class F {}

    const f = new F();

    expect(mInstanceof(f, F)).toBe(true);
  });

  it('should return true when checking an object or prototype that extends from Object', () => {
    class F {}

    const f = new F();

    expect(mInstanceof(f, Object)).toBe(true);
    expect(mInstanceof(F.prototype, Object)).toBe(true);
  });
});
