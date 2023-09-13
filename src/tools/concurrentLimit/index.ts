import Queue from '@/structure/queue';

type FuncLike = (...args: any[]) => void;

/**
 * 控制最大并发数
 * @param limit 最大并发数
 */
export default function concurrentLimit(limit: number) {
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

// let id = 0;

// function createTask(timeout: number) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(id++);
//     }, timeout);
//   });
// }

// const startTime = new Date().getTime();

// const cLimit = concurrentLimit(2);
// const p1 = cLimit(() => createTask(1000)).then((res) => {
//   const endTime = new Date().getTime();
//   const diffTime = endTime - startTime;

//   console.log(`id: ${res} at ${diffTime}`);
// });
// const p2 = cLimit(() => createTask(2000)).then((res) => {
//   const endTime = new Date().getTime();
//   const diffTime = endTime - startTime;

//   console.log(`id: ${res} at ${diffTime}`);
// });
// const p3 = cLimit(() => createTask(3000)).then((res) => {
//   const endTime = new Date().getTime();
//   const diffTime = endTime - startTime;

//   console.log(`id: ${res} at ${diffTime}`);
// });

// const p4 = cLimit(() => createTask(4000)).then((res) => {
//   const endTime = new Date().getTime();
//   const diffTime = endTime - startTime;

//   console.log(`id: ${res} at ${diffTime}`);
// });
