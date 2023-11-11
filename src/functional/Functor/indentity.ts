import type { FunctorImpl } from './box';

export interface IndentityFunctory<T> extends FunctorImpl<T> {
  map<U>(f: (value: T) => U): IndentityFunctory<U>
  //  可以观察入参
  inspect: () => string
}

export function Indentity<T>(x: T): IndentityFunctory<T> {
  return {
    map<U>(f: (value: T) => U): IndentityFunctory<U> {
      return Indentity(f(x));
    },
    valueOf(): T {
      return x;
    },
    inspect() {
      return `Indentity {${x}}`;
    },
  };
}
