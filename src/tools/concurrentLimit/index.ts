import { Queue } from '@/structure/queue';

type FuncLike = (...args: any[]) => void;

/**
 * 控制最大并发数
 * @param {number} limit 最大并发数
 * @example
 * export function concurrentLimit(limit: number) {
  const queue = new Queue<FuncLike>();

  //  正在进行的并发任务数量
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.size > 0)
      (queue.dequeue()!)();
  };

  const run = async (fn: FuncLike, resolve: FuncLike, args: any[]) => {
    activeCount++;

    const result = (async () => fn(...args))();
    resolve(result);

    try {
      await result;
    }
    catch (e) {
      console.error('Concurrent occrud error:', e);
    }

    next();
  };

  const enqueue = (fn: FuncLike, resolve: FuncLike, args: any[]) => {
    queue.enqueue(run.bind(undefined, fn, resolve, args));

    (async () => {
      await Promise.resolve();
      if (activeCount < limit && queue.size > 0)
        (queue.dequeue()!)();
    })();
  };

  const generator = (fn: FuncLike, ...args: any[]) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve, args);
    });
  };

  return generator;
}
 */
export function concurrentLimit(limit: number) {
  const queue = new Queue<FuncLike>();

  //  正在进行的并发任务数量
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.size > 0)
      (queue.dequeue()!)();
  };

  const run = async (fn: FuncLike, resolve: FuncLike, args: any[]) => {
    activeCount++;

    const result = (async () => fn(...args))();
    resolve(result);

    try {
      await result;
    }
    catch (e) {
      console.error('Concurrent occrud error:', e);
    }

    next();
  };

  const enqueue = (fn: FuncLike, resolve: FuncLike, args: any[]) => {
    queue.enqueue(run.bind(undefined, fn, resolve, args));

    (async () => {
      await Promise.resolve();
      if (activeCount < limit && queue.size > 0)
        (queue.dequeue()!)();
    })();
  };

  const generator = (fn: FuncLike, ...args: any[]) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve, args);
    });
  };

  return generator;
}

//  启动命令
//  ts-node -r tsconfig-paths/register ./src/tools/concurrentLimit/index.ts --files
