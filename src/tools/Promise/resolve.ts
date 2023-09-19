interface PromiseConstructor {
  /**
   * Creates a new resolved promise.
   * @returns A resolved promise.
   */
  mResolve(): Promise<void>
  /**
   * Creates a new resolved promise for the provided value.
   * @param value A promise.
   * @returns A promise whose internal state matches the provided promise.
   */
  mResolve<T>(value: T): Promise<Awaited<T>>
  /**
   * Creates a new resolved promise for the provided value.
   * @param value A promise.
   * @returns A promise whose internal state matches the provided promise.
   */
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
