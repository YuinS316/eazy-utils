function SupType(this: any, name: string) {
  this.name = name;
  this.colors = ['a'];
}

SupType.prototype.say = function () {
  return this.age;
};

export function SubType(this: any, name: string, age: number) {
  SupType.call(this, name);
  this.age = age;
}

const prototype = Object.create(SupType.prototype);
SubType.prototype = prototype;
SubType.prototype.constructor = SubType;
SubType.prototype.hello = function () {
  return this.age;
};
