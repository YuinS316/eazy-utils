import { describe, expect, it } from 'vitest';
import { Singleton } from '../index';

describe('singleton', () => {
  it('should return same instance when getInstance ', () => {
    const a = Singleton.getInstance();
    const b = Singleton.getInstance();

    expect(a).toBe(b);
    expect(a).not.toBe(undefined);
  });
});
