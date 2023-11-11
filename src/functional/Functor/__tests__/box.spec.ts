import { assertType, describe, expect, it } from 'vitest';
import { Box } from '../box';
import { add4, divide2, multiply3 } from './helper';

describe('box', () => {
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

  it('should can assume type', () => {
    const newBox = Box(10).map(toString);
    assertType<string>(newBox.valueOf());
  });
});
