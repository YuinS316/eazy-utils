/**
 * 防抖函数，在一定时间内触发会重新计时
 *
 * @param fn 执行的函数
 * @param timeout 延迟执行的时间(ms)
 * @param immediate 是否立即执行
 * @returns {Function} 包装后的函数
 */
export function debounce(fn: Function, timeout: number, immediate = false): Function {
  let timer: NodeJS.Timeout | null = null;

  const func = function (...args: any[]) {
    if (timer)
      clearTimeout(timer);

    if (!immediate) {
      timer = setTimeout(() => {
        fn(...args);
      }, timeout);
    }
    else {
      if (!timer)
        fn(...args);

      timer = setTimeout(() => {
        fn(...args);
      }, timeout);
    }
  };

  return func;
}
