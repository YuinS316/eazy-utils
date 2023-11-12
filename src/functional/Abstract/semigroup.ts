//  半群，符合结合律和闭合两个特性
//  结合律类似加法和乘法结合律，在各个数字位置不变的情况下，重新排列表达式中的括号，不会影响最终的结果
//  闭合是指我们对某个集合的成员进行运算后，生成的仍然是这个集合的成员。 简单点理解就是最后的结果类型不变
export interface SemiGroupImpl<T> {
  value: T
  concat(x: SemiGroupImpl<T>): SemiGroupImpl<T>
}

export interface NumberAddSemiGroup extends SemiGroupImpl<number> {
  value: number
  concat(box: NumberAddSemiGroup): NumberAddSemiGroup
}

export function Add(value: number): NumberAddSemiGroup {
  return {
    value,
    concat(box) {
      return Add(value + box.value);
    },
  };
}
