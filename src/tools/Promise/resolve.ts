interface PromiseConstructor {
  mResolve(): Promise<void>
  mResolve<T>(value: T): Promise<Awaited<T>>
  mResolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>
}

const isUndefined = (target: unknown): target is undefined => target === undefined;

Promise.mResolve = function<T>(value?: T | PromiseLike<T>) {
  if (value instanceof Promise)
    return value;

  if (isUndefined(value))
    return new Promise<void>(resolve => resolve());

  return new Promise<T>(resolve => resolve(value));
};
