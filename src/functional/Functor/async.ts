import { Maybe } from './maybe';

export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

export function Async<T>(p: AsyncFunction<T>) {
  return p()
    .then(value => Maybe(value))
    .catch(() => Maybe(null));
}
