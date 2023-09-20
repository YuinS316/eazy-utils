export function mInstanceof(object: Object, constructor: Function): boolean {
  let proto = Object.getPrototypeOf(object);

  while (true) {
    if (proto === constructor.prototype)
      return true;

    if (proto === null)
      return false;

    proto = Object.getPrototypeOf(proto);
  }
}
