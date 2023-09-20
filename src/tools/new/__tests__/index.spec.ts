import { describe, expect, it } from 'vitest';
import { mNew } from '../index';

describe('new', () => {
  it('should return new object', () => {
    function Person(this: any, name: string) {
      this.name = name;
    }

    Person.prototype.sayHello = function () {
      return (`my name is ${this.name}`);
    };

    const p = mNew(Person, 'alan');

    expect(p.sayHello()).toBe('my name is alan');
    expect(p instanceof Person).toBe(true);
  });

  it('should return object that is created by constructor', () => {
    function Person(this: any, name: string) {
      this.name = name;
      return {
        name: 'bbb',
      };
    }

    const p = mNew(Person, 'aaa');
    expect(p.name).toBe('bbb');
  });
});
