type Func = (...args: any[]) => any;

export function pipe(...fns: Func[]) {
  if (fns.length === 0)
    return (args: any) => args;

  if (fns.length === 1)
    return fns[0];

  function fun(val: any, func: Func) {
    return func(val);
  }

  return function (value: any) {
    return fns.reduce(fun, value);
  };
}
