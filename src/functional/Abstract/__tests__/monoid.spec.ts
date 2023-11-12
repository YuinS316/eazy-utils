import { describe, expect, it } from 'vitest';
import { Add } from '../monoid';

describe('monoid', () => {
  describe('number add monoid', () => {
    it('Monoid Add', () => {
      const res = Add.empty().concat(Add(1)).concat(Add(2)).concat(Add(3)).concat(Add(4));
      expect(res.value).toBe(10);
    });

    it('reduce', () => {
      const callback = (x: number, y: number) => x + y;

      expect([1, 2, 3, 4].reduce(callback, 0)).toBe(10);
    });

    it('put Monoid into reduce', () => {
      //  可以看到无论是monoid还是reduce，都是通过两两组合，循环往复
      //  最后实现了 将有限的二元运算延伸至无限的n元运算
      //  自然的，我们可以将Monoid的放到reduce里面中，简化盒子的代码

      const res = [1, 2, 3, 4].reduce((monoid, num) => monoid.concat(Add(num)), Add.empty());
      expect(res.value).toBe(10);
    });

    it('map + reduce', () => {
      //  上面的case其实延伸出了另一个点，就是我们可先把元素都包装成Monoid，然后再进行reduce
      const res = [1, 2, 3, 4]
        .map(value => Add(value))
        .reduce((monoid, currentMonoid) => monoid.concat(currentMonoid), Add.empty());
      expect(res.value).toBe(10);
    });
  });
});
