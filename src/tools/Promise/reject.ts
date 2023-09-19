interface PromiseConstructor {
  /**
   * Creates a new rejected promise for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected Promise.
   */
  mReject<T = never>(reason?: any): Promise<T>
}

Promise.mReject = function<T = never> (reason?: any): Promise<T> {
  return new Promise<T>((resolve, reject) => reject(reason));
};
