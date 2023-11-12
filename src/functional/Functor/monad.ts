import type { IndentityFunctory } from './indentity';

export interface MonadFunctor<T> extends IndentityFunctory<T> {
  map<U>(f: (value: T) => U): MonadFunctor<U>
  flatMap<U>(f: (value: T) => U): U
}

/**
 * Monad Functor
 *
 * @description Monad提供了flatMap方法，用于解决嵌套盒子的问题
 * @param x
 * @returns
 */
export function Monad<T>(x: T): MonadFunctor<T> {
  return {
    map<U>(f: (value: T) => U): MonadFunctor<U> {
      return Monad(f(x));
    },
    valueOf(): T {
      return x;
    },
    inspect() {
      return `Monad {${x}}`;
    },
    flatMap<U>(f: (value: T) => U): U {
      return f(x);
    },
  };
}
