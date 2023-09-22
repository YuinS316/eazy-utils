export function curry(fn: Function, ...args: any[]) {
  if (fn.length > args.length)
    return (...otherArgs: any[]) => curry(fn, ...args, ...otherArgs);
  return fn(...args);
}
