export interface RetryOptions {
  //  最大的重试次数
  times: number
  //  尝试之间休眠的次数
  delay: number
};

const defaultOptions: RetryOptions = {
  times: 3,
  delay: 0,
};

export async function retry(fn: (...args: any[]) => Promise<any>, options: Partial<RetryOptions> = {}): Promise<any> {
  const retryOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const res = await fn();
    return res;
  }
  catch (e) {
    if (retryOptions.times >= 0) {
      retryOptions.times -= 1;

      await sleep(retryOptions.times);

      return retry(fn, { ...retryOptions });
    }

    throw new Error('retry 超出重试次数');
  }
}

function sleep(timeout: number = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
}
