interface PromiseConstructor {
  mAllSettled<T extends readonly unknown[] | []>(values: T): Promise<PromiseSettledResult<Awaited<T>>[]>
}

Promise.mAllSettled = function<T extends readonly unknown[] | []> (values: T) {
  const result: any[] = [];

  const promiseArr = values.map(item => item instanceof Promise ? item : Promise.resolve(item));

  let count = 0;

  const createRejected = (reason: any): PromiseRejectedResult => {
    return {
      reason,
      status: 'rejected',
    };
  };

  const createFulfilled = (value: T): PromiseFulfilledResult<T> => {
    return {
      value,
      status: 'fulfilled',
    };
  };

  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      item.then((res) => {
        count++;
        result[index] = createFulfilled(res);

        if (count === promiseArr.length)
          resolve(result);
      }, (err) => {
        count++;
        result[index] = createRejected(err);
        if (count === promiseArr.length)
          resolve(result);
      });
    });
  });
};
