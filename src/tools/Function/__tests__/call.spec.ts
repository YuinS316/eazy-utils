import { describe, expect, it, vi } from 'vitest';
import '../call.js';

describe('Function.prototype.mCall', () => {
  it('should bind to globalThis when bound to null or undefined', () => {
    vi.stubGlobal('name', 'global');

    function fn(this: any) {
      return `${this.name} work`;
    }

    expect(fn.mCall(undefined)).toBe('global work');
  });

  it('should transform basis data type to reference data type', () => {
    function fn(this: any) {
      return this + 2;
    }

    expect(fn.mCall(1)).toBe(3);
  });

  it('should work with received arguments', () => {
    function fn(this: any, address: string, age: number) {
      return `${this.name}/${address}/${age}`;
    }

    const a = {
      name: 'alan',
    };

    expect(fn.mCall(a, 'China', 18)).toBe('alan/China/18');
  });
});
