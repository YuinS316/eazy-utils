import type { MonoidFuncImpl, MonoidImpl } from '@/functional/Abstract/monoid';

/**
 * foldMap
 *
 * @description foldMap 函数组合的是不同的Monoid 盒子
 * @param Monoid
 * @param arr
 * @returns {MonoidImpl} 新的Monoid 盒子
 */
export function foldMap<T>(Monoid: MonoidFuncImpl<T>, arr: Array<T>): MonoidImpl<T> {
  return arr.map(item => Monoid(item)).reduce((prevMonoid, currentMonoid) => {
    return prevMonoid.concat(currentMonoid);
  }, Monoid.empty());
}
