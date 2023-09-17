interface Function {
  mCall: (this: Function, thisArg: any, ...argArray: any[]) => any
}

// eslint-disable-next-line no-extend-native
Function.prototype.mCall = function (this: Function, thisArg: any, ...argArray: any[]): any {
  if (thisArg === undefined || thisArg === null)
    thisArg = globalThis;
  else if (typeof thisArg !== 'object')
    thisArg = Object(thisArg);

  const fn = Symbol('fn');
  thisArg[fn] = this;

  const result = thisArg[fn](...argArray);

  delete thisArg[fn];

  return result;
};
