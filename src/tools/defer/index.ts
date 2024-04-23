type Fn = (...args: any[]) => any;
type MainFn = (fn: Fn) => any;

/**
 * defer允许您运行异步函数，注册应推迟到异步函数完成后再执行的函数
 * @param mainFn
 * @returns
 */
export async function defer<T>(mainFn: MainFn): Promise<Awaited<T>> {
  const cleanupList: Fn[] = [];

  const cleanup = (cleanupFn: Fn) => {
    cleanupList.push(cleanupFn);
  };

  const res = await mainFn(cleanup);

  for (const task of cleanupList)
    await task();

  return res;
}
