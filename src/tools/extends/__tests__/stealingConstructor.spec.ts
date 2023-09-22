import { describe, expect, it } from 'vitest';
import { SubType } from '../stealingConstructor';

describe('stealing constructor', () => {
  it('should not be effected when change superclass prototype\'s reference props', () => {
    const p = new (SubType as any)('p', 18);
    const p1 = new (SubType as any)('p1', 18);

    p.colors.push('c');

    expect(p.name).toBe('p');
    expect(p.age).toBe(18);
    expect(p1.colors).toEqual(['a', 'b']);
  });

  it('should not get the super class \'s prototype \'s props', () => {
    const p = new (SubType as any)('p', 18);

    expect(p.say).toBeUndefined();
  });
});
