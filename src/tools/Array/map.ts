interface Array<T> {
  mMap<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[]
}

// eslint-disable-next-line no-extend-native
Array.prototype.mMap = function (cb, thisArg?) {
  const result: any[] = [];

  for (let i = 0; i < this.length; i++)
    result.push(cb.call(thisArg, this[i], i, this));

  return result;
};
