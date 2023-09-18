/**
 * 数组扁平化
 * @param arr 需要扁平化的数组
 * @param depth 指定要提取嵌套数组的结构深度
 * @returns
 */
export function flat(arr: Array<any>, depth: number = 1) {
  let result: any[] = [];

  arr.forEach((item) => {
    if (!Array.isArray(item) || depth <= 0)
      result.push(item);
    else
      result = result.concat(flat(item, depth - 1));
  });

  return result;
}
