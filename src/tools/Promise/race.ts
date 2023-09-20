interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
   * or rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  mRace<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>
}

Promise.mRace = function<T extends readonly unknown[] | []> (values: T) {
  const promiseArr: Promise<unknown>[] = values.map((item) => {
    return item instanceof Promise ? item : Promise.resolve(item);
  });

  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      item.then((res) => {
        resolve(res as Awaited<T[number]>);
      }, (err) => {
        reject(err);
      });
    });
  });
};
