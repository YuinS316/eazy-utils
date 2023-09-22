//  伪经典继承（组合继承）
//  原型链 + 盗用构造函数
//  缺点: 实际上调用了两次父类的构造函数，其中原型中父类的实例属性被屏蔽了

function SupType(this: any, age: number) {
  this.colors = ['a', 'b'];
  this.age = age;
}

SupType.prototype.say = function () {
  return this.age;
};

export function SubType(this: any, name: string, age: number) {
  //  继承父类的实例方法
  SupType.call(this, age);
  this.name = name;
}

//  继承父类的原型属性
SubType.prototype = new (SupType as any)();
