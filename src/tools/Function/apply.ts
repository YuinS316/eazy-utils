interface Function {
  mApply: (this: Function, thisArg: any, argArray?: any[]) => any
}

// eslint-disable-next-line no-extend-native
Function.prototype.mApply = function (this: any, thisArg: any, argArray?: any[]) {
  if (thisArg === undefined || thisArg === null)
    thisArg = globalThis;

  else if (typeof thisArg !== 'object')
    thisArg = Object(thisArg);

  const fn = Symbol('fn');

  thisArg[fn] = this;
  argArray ||= [];

  const result = thisArg[fn](...argArray);

  delete thisArg[fn];

  return result;
};
