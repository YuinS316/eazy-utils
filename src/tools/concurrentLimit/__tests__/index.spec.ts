import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { concurrentLimit } from '../index';

describe('concurrent limit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function createTaskClousre() {
    let id = 0;

    const createTask = (timeout: number): Promise<number> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id++);
        }, timeout);
      });
    };

    return createTask;
  }

  it('should work', async () => {
    const createTask = createTaskClousre();

    const cLimit = concurrentLimit(2);
    const p1 = cLimit(() => createTask(1000));
    const p2 = cLimit(() => createTask(2000));
    const p3 = cLimit(() => createTask(3000));

    //  如果没有并发限制的话，前进到3000毫秒，此时三个都已经resolve
    //  但是存在了并发限制，p3会在第1000毫秒启动，于第4000毫秒resolve
    await vi.advanceTimersByTimeAsync(3000);
    expect(p1).resolves.toBe(0);
    expect(p2).resolves.toBe(1);
    expect(vi.getTimerCount()).toBe(1);
    await vi.advanceTimersByTimeAsync(1000);
    expect(p3).resolves.toBe(2);
  });

  it('should work with Promise.all', async () => {
    const createTask = createTaskClousre();

    const cLimit = concurrentLimit(3);

    const arr = Array.from({ length: 10 });

    const taskList = Array.from({ length: 10 }).map(() => cLimit(() => createTask(1000)));

    //  前进1000毫秒此时第一批任务已经结束，进行第二批任务
    await vi.advanceTimersByTimeAsync(1000);
    expect(vi.getTimerCount()).toBe(3);

    //  前进1000毫秒此时第一批任务已经结束，进行第三批任务
    await vi.advanceTimersByTimeAsync(1000);
    expect(vi.getTimerCount()).toBe(3);

    //  前进1000毫秒此时第一批任务已经结束，进行第四批任务
    await vi.advanceTimersByTimeAsync(1000);
    expect(vi.getTimerCount()).toBe(1);

    Promise.all(taskList).then((res) => {
      expect(res).resolves.toEqual(arr.map((_, index) => index));
    });
  });
});
