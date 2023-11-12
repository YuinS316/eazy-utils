//  Monoid 幺半群
//  他其实是在半裙的基础上实现了一个单位元
//  单位元：它和任何运算数相结合时，都不会改变那个运算数
//  举个例子就是在加法中，0就是单位元；乘法中就是1；

import type { SemiGroupImpl } from './semigroup';

export interface MonoidImpl<T> extends SemiGroupImpl<T> {
}

export interface MonoidFuncImpl<T> {
  (value: T): MonoidImpl<T>
  empty(): MonoidImpl<T>
}

export interface NumberAddMonoid extends MonoidImpl<number> {
  concat(box: NumberAddMonoid): NumberAddMonoid
}

export interface NumberAddFuncMonoid extends MonoidFuncImpl<number> {
  (value: number): NumberAddMonoid
  empty(): NumberAddMonoid
}

export const Add: NumberAddFuncMonoid = (value) => {
  return {
    value,
    empty() {
      return Add(0);
    },
    concat(box) {
      return Add(value + box.value);
    },
  };
};
Add.empty = () => Add(0);
