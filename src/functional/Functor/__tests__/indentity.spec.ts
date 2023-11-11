import { assertType, describe, expect, it } from 'vitest';
import { Indentity as Box } from '../indentity';
import { add4, divide2, multiply3 } from './helper';

describe('indentity functor', () => {
  it('happy path', () => {
    const newBox = Box(10).map(add4);
    expect(newBox.valueOf()).toBe(14);
  });

  it('should can be chainable', () => {
    const newBox = Box(10)
      .map(add4)
      .map(multiply3)
      .map(divide2);
    expect(newBox.valueOf()).toBe(21);
  });

  it('should can inspect input', () => {
    const value = Box(10).map(add4)
      .map(multiply3).inspect();

    expect(value).toBe(`Indentity {${14 * 3}}`);
  });

  it('should can assume type', () => {
    const newBox = Box(10).map(toString);
    assertType<string>(newBox.valueOf());
  });
});
