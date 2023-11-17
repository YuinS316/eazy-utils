interface PromiseConstructor {
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
