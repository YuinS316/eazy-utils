/**
 * 节流函数，在N秒内只执行一次
 *
 * @param fn
 * @param timeout
 * @param leading 是否立即执行一次
 * @param trailing 结束调用的时候是否还要执行一次
 */
export function throttle(fn: Function, timeout: number, leading = true, trailing = true) {
  let startTime: number = 0;
  let timer: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    const currentTime = new Date().getTime();

    if (!startTime && !leading)
      startTime = currentTime;

    //  剩余时间
    const remaining = timeout - (currentTime - startTime);

    if (remaining < 0 || remaining > timeout) {
      fn(...args);

      startTime = currentTime;
    }

    if (trailing) {
      if (timer)
        clearTimeout(timer);

      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, remaining);
    }
  };
}
