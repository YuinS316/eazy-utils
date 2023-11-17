interface PromiseConstructor {
  mReject<T = never>(reason?: any): Promise<T>
}

Promise.mReject = function<T = never> (reason?: any): Promise<T> {
  return new Promise<T>((resolve, reject) => reject(reason));
};
