/* eslint-disable no-console */

export class LazyMan {
  public cbs: Function[] = [];

  constructor(public name: string) {
    console.log(`This is ${name}`);
    setTimeout(() => {
      this.next();
    });
  }

  private next() {
    if (this.cbs.length) {
      const fn = this.cbs.shift()!;
      fn();
    }
  }

  eat(meal: string) {
    this.cbs.push(() => {
      console.log(`eat ${meal}`);
      this.next();
    });
    return this;
  }

  sleep(time: number) {
    this.cbs.push(() => {
      setTimeout(() => {
        this.next();
      }, time);
    });
    return this;
  }

  sleepFirst(time: number) {
    this.cbs.unshift(() => {
      setTimeout(() => {
        this.next();
      }, time);
    });
    return this;
  }
}
