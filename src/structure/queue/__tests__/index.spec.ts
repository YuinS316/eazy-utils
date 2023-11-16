import { beforeEach, describe, expect, it, test } from 'vitest';
import { Queue } from '../index';

describe('queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should enqueue work', () => {
    queue.enqueue(1);
    expect(queue.size).toBe(1);

    queue.enqueue(2);
    expect(queue.size).toBe(2);
  });

  it('should dequeue work', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    const first = queue.dequeue();
    expect(first).toBe(1);
    expect(queue.size).toBe(1);

    const second = queue.dequeue();
    expect(second).toBe(2);
    expect(queue.size).toBe(0);
  });

  it('should return undefined when dequeue size 0', () => {
    const res = queue.dequeue();
    expect(res).toBe(undefined);
    expect(queue.size).toBe(0);
  });

  it('should iterator work', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    let i = 1;
    for (const item of queue)
      expect(item).toBe(i++);
  });

  it('should getHeade return head value', () => {
    expect(queue.getHead()).toBe(undefined);
    queue.enqueue(1);
    expect(queue.getHead()).toBe(1);

    queue.enqueue(2);
    expect(queue.getHead()).toBe(1);
  });
});
