interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved with an array of results when all of the provided Promises
   * resolve, or rejected when any Promise is rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  mAll<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>
}

Promise.mAll = function<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
  const result: any[] = [];

  let promiseArr: Promise<unknown>[] = [];

  //  将非promise转成promise
  promiseArr = values.map((item) => {
    return item instanceof Promise ? item : Promise.resolve(item);
  });

  //  计算resolve的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      item.then((res) => {
        result[index] = res;
        count++;

        if (count === promiseArr.length)
          resolve(result as { -readonly [P in keyof T]: Awaited<T[P]> });
      }, (err) => {
        reject(err);
      });
    });
  });
};
