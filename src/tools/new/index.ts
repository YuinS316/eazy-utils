export function mNew(constructor: Function, ...args: any[]) {
  const obj = Object.create(constructor.prototype);

  const res = constructor.call(obj, ...args);

  if (res && (typeof res === 'object'))
    return res;

  return obj;
}
