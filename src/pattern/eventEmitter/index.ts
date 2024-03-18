type Func = (...args: any[]) => void;

type Events = Record<string, Func[] | undefined>;

/**
 * @class
 * @classdesc 发布订阅
 */
export default class Emitter {
  /**
   * 存储已经注册的事件
   */
  private events: Events = {};

  /**
   * @constructor
   * @example
   *   constructor() {
    this.events = {}
  }
   */
  constructor() {

  }

  /**
   * 注册事件
   * @param {string} name 事件名
   * @param {Function} fn 具体的事件
   * @returns {void}
   * @example
   *   on(name: string, fn: Func) {
    if (!Array.isArray(this.events[name]))
      this.events[name] = [];

    this.events[name]!.push(fn);
  }
   */
  on(name: string, fn: Func) {
    if (!Array.isArray(this.events[name]))
      this.events[name] = [];

    this.events[name]!.push(fn);
  }

  /**
   * 注册一次性事件，触发后移除
   * @param {string} name 事件名
   * @param {Function} fn 具体的事件
   * @returns {void}
   * @example
   *   once(name: string, fn: Func) {
    if (!Array.isArray(this.events[name]))
      this.events[name] = [];

    const wraperFn = (...args: any[]) => {
      fn(...args);
      this.off(name, wraperFn);
    };

    this.events[name]!.push(wraperFn);
  }
   */
  once(name: string, fn: Func) {
    if (!Array.isArray(this.events[name]))
      this.events[name] = [];

    const wraperFn = (...args: any[]) => {
      fn(...args);
      this.off(name, wraperFn);
    };

    this.events[name]!.push(wraperFn);
  }

  /**
   * 移除事件，如果没有提供具体的事件，则移除该事件名下的所有事件
   * @param {string} name 事件名
   * @param {Function | undefined} fn 具体的时间
   * @returns {void}
   * @example
   *   off(name: string, fn?: Func) {
    if (!Array.isArray(this.events[name]))
      return;

    if (fn)
      this.events[name] = this.events[name]!.filter(item => item !== fn);
    else
      this.events[name] = [];
  }
   */
  off(name: string, fn?: Func) {
    if (!Array.isArray(this.events[name]))
      return;

    if (fn)
      this.events[name] = this.events[name]!.filter(item => item !== fn);
    else
      this.events[name] = [];
  }

  /**
   * 触发事件，如果该事件名没有注册，则不会触发
   * @param {string} name 事件名
   * @returns {void}
   * @example
   *   emit(name: string) {
    if (!Array.isArray(this.events[name]))
      return;

    this.events[name]!.forEach((fn) => {
      fn();
    });
  }
   */
  emit(name: string) {
    if (!Array.isArray(this.events[name]))
      return;

    this.events[name]!.forEach((fn) => {
      fn();
    });
  }
}
