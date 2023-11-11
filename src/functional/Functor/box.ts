export interface FunctorImpl<T> {
  map<U>(f: (value: T) => U): FunctorImpl<U>
  valueOf(): T
}

export function Box<T>(x: T): FunctorImpl<T> {
  return {
    map<U>(f: (value: T) => U): FunctorImpl<U> {
      return Box(f(x));
    },
    valueOf(): T {
      return x;
    },
  };
}
