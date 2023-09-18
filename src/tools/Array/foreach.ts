interface Array<T> {
  mForEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void
}

// eslint-disable-next-line no-extend-native
Array.prototype.mForEach = function (cb, thisArg?) {
  for (let i = 0; i < this.length; i++)
    cb.call(thisArg, this[i], i, this);
};
