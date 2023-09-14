type Func = (...args: any[]) => void;

type Events = Record<string, Func[] | undefined>;

export default class Emitter {
  private events: Events = {};

  constructor() {

  }

  on(name: string, fn: Func) {
    if (!Array.isArray(this.events[name]))
      this.events[name] = [];

    this.events[name]!.push(fn);
  }

  once(name: string, fn: Func) {
    if (!Array.isArray(this.events[name]))
      this.events[name] = [];

    const wraperFn = (...args: any[]) => {
      fn(...args);
      this.off(name, wraperFn);
    };

    this.events[name]!.push(wraperFn);
  }

  off(name: string, fn?: Func) {
    if (!Array.isArray(this.events[name]))
      return;

    if (fn)
      this.events[name] = this.events[name]!.filter(item => item !== fn);
    else
      this.events[name] = [];
  }

  emit(name: string) {
    if (!Array.isArray(this.events[name]))
      return;

    this.events[name]!.forEach((fn) => {
      fn();
    });
  }
}
