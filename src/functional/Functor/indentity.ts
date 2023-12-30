import type { FunctorImpl } from './box';

export interface IndentityFunctory<T> extends FunctorImpl<T> {
  map<U>(f: (value: T) => U): IndentityFunctory<U>
  //  可以观察入参
  inspect: () => string
}

/**
 * Indentity 函子
 *
 * @description Indentity 函子，盒子模型中加入了inspect可以观察当前存储的值
 * @param {T} x 被包裹的数据
 * @returns 返 Indentity
 * @example
 * // 实现
 * function Indentity<T>(x: T): IndentityFunctory<T> {
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
 * // 使用
const value = Box(10).map(add4)
      .map(multiply3).inspect();

    expect(value).toBe(`Indentity {${14 * 3}}`);
 */
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
