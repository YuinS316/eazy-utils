import { describe, expect, it } from 'vitest';
import type { FnConstructor } from '../prototype';
import { extend } from '../prototype';

describe('extends by prototype chains', () => {
  it('should inherit superclass attribute', () => {
    class SuperClass {
      alias = 'super';
      constructor() {

      }

      public say() {
        return this.alias;
      }
    }

    function SubClass() {};

    extend(SubClass, SuperClass);
    const sub = new (SubClass as any)();

    expect(sub.alias).toBe('super');
    expect(sub.say()).toBe('super');
  });

  it('should can add extra props to prototype', () => {
    class SuperClass {
      alias = 'super';
      constructor() {

      }

      public say() {
        return this.alias;
      }
    }

    function Children() {}

    extend(Children, SuperClass);
    Children.prototype.say = function () {
      return `${this.alias}!`;
    };
    Children.prototype.chat = function () {
      return 'chat';
    };
    const sub = new (Children as any)();
    expect(sub.say()).toBe('super!');
    expect(sub.chat()).toBe('chat');
  });

  it('should be effected when change superclass prototype\'s reference props', () => {
    class SuperClass {
      colors = ['red'];
    }
    function Children() {}
    extend(Children, SuperClass);

    const c = new (Children as any)();
    const c1 = new (Children as any)();

    c.colors.push('blue');
    expect(c.colors).toEqual(['red', 'blue']);
    expect(c1.colors).toEqual(['red', 'blue']);
  });
});
