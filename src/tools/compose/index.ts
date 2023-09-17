type Func = (...args: any[]) => any;

export function compose(...fns: Func[]): Func {
  if (!fns.length)
    return arg => arg;

  if (fns.length === 1)
    return fns[0];

  return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
}
