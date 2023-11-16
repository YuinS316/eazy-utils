import { beforeEach, describe, expect, it } from 'vitest';
import { Stack } from '../index';

describe('stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('should push work', () => {
    stack.push(1);
    expect(stack.size).toBe(1);

    stack.push(2);
    expect(stack.size).toBe(2);
  });

  it('should pop will delete and return which is the lastest pushed', () => {
    expect(stack.pop()).toBe(undefined);

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.size).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.size).toBe(0);
  });

  it('should head will return which is the lastest pushed', () => {
    expect(stack.head).toBe(undefined);

    stack.push(1);
    expect(stack.head).toBe(1);

    stack.push(2);
    expect(stack.head).toBe(2);
  });

  it('should iterator work', () => {
    stack.push(1);
    stack.push(2);

    let i = 2;
    for (const item of stack)
      expect(item).toBe(i--);
  });
});
