interface Array<T> {
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  mReduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T
  mReduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  mReduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
}

// eslint-disable-next-line no-extend-native
Array.prototype.mReduce = function (cb: (arg0: any, arg1: any, arg2: number, arg3: any[]) => any, initialValue?: any) {
  const startIndex = initialValue !== undefined ? 0 : 1;

  let result = initialValue !== undefined ? initialValue : this[0];

  for (let j = startIndex; j < this.length; j++)
    result = cb(result, this[j], j, this);

  return result;
};
