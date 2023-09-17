import { describe, expect, it, vi } from 'vitest';
import '../bind';

describe('Function.prototype.mCall', () => {
  it('should return a new function', () => {
    function fn() {}

    expect(fn.mBind(null)).not.toBe(fn);
  });

  it('should not change this after bind', () => {
    function fn(this: any) {
      return this.name;
    };

    const obj = {
      name: 'obj',
    };

    const obj2 = {
      name: 'obj2',
    };

    expect(fn.mBind(obj).mBind(obj2)()).toBe('obj');
  });

  it('should can bind to constructor and then can new', () => {
    interface PersonInstance {
      name: string
      age: number
    };

    function Person(this: PersonInstance, name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    const PersonBase = Person.mBind(null, 'alan');

    const p = new (PersonBase as any)(18);

    expect(p.name).toBe('alan');
    expect(p.age).toBe(18);
  });

  it('should bind to globalThis when bound to null or undefined', () => {
    vi.stubGlobal('name', 'global');

    function fn(this: any) {
      return `${this.name} work`;
    }

    expect(fn.mBind(undefined)()).toBe('global work');
  });

  it('should transform basis data type to reference data type', () => {
    function fn(this: any) {
      return this + 2;
    }

    expect(fn.mBind(1)()).toBe(3);
  });

  it('should work with received arguments', () => {
    function fn(this: any, address: string, age: number) {
      return `${this.name}/${address}/${age}`;
    }

    const a = {
      name: 'alan',
    };

    expect(fn.mBind(a, 'China', 18)()).toBe('alan/China/18');
  });
});
