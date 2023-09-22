//  盗用构造函数
//  优点：可以往父类的构造函数传递参数
//  缺点：
//    1、无法复用，必须在函数内写死
//    2、子类无法访问父类原型上的方法

function SupType(this: any, age: number) {
  this.colors = ['a', 'b'];
  this.age = age;
}

SupType.prototype.say = function () {
  return this.age;
};

export function SubType(this: any, name: string, age: number) {
  SupType.call(this, age);
  this.name = name;
}
