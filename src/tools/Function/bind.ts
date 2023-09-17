interface Function {
  mBind: (this: Function, thisArg: any, ...argArray: any[]) => any
}

// eslint-disable-next-line no-extend-native
Function.prototype.mBind = function (this, thisArg, ...argArray) {
  if (thisArg === undefined || thisArg === null)
    thisArg = globalThis;
  else if (typeof thisArg !== 'object')
    thisArg = Object(thisArg);

  const context = this;

  function BoundFunction(this: Function, ...args: any[]) {
    if (new.target)
      thisArg = this;

    return context.apply(thisArg, [...argArray, ...args]);
  };

  return BoundFunction;
};
