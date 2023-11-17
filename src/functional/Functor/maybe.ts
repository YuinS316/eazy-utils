import type { IndentityFunctory } from './indentity';

export interface MaybeFunctor<T> extends IndentityFunctory<T> {
  map<U>(f: (value: T) => U): MaybeFunctor<U>
}

type EmptyType = undefined | null;
function isEmpty(x: unknown): x is EmptyType {
  return [undefined, null].some(item => Object.is(item, x));
}

/**
 * Maybe Functor
 *
 * @description Maybe Functor 在 Identity Functor 的基础上，增加了对空数据的校验。
 * @param x
 * @returns {MaybeFunctor} 返回Maybe Functor
 */
export function Maybe<T>(x: T): MaybeFunctor<T> {
  return {
    map<U>(f: (value: T) => U): MaybeFunctor<U> {
      return isEmpty(x) ? Maybe<null>(null) as MaybeFunctor<U> : Maybe<U>(f(x));
    },
    valueOf(): T {
      return x;
    },
    inspect() {
      return `Maybe {${x}}`;
    },
  };
}
