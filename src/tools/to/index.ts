/**
 * 模仿go的错误捕获策略
 * @param promise
 * @returns
 */
export function to<T, U = Error>(promise: Promise<T>): Promise<[null, T] | [U, undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      return [err, undefined];
    });
}
