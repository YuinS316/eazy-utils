import { describe, expect, it } from 'vitest';
import { SubType } from '../extend';

describe('Parasitic combined inheritance', () => {
  it('should can access super class props', () => {
    const p = new (SubType as any)('p', 18);
    expect(p.name).toBe('p');
    expect(p.age).toBe(18);
    expect(p.say()).toBe(18);
  });

  it('should can add extra props to its prototype', () => {
    SubType.prototype.hello = function () {
      return this.name;
    };

    const p = new (SubType as any)('p', 18);

    expect(p.hello()).toBe('p');

    delete SubType.prototype.hello;
  });
});
