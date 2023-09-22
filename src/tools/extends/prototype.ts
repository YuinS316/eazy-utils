export interface FnConstructor {
  new (...args: any[]): any
}

/**
 * 原型链继承
 *
 * 缺点:
 *
 * 1、父类实例化后如果有引用类型的属性，子类实例化后对其修改，每个子类实例都会收到影响
 *
 * 2、子类实例化的时候不能给父类构造函数传参
 *
 * @param Child
 * @param Parent
 */
export function extend(Child: any, Parent: any) {
  Child.prototype = new Parent();
}
