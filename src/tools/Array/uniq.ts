/**
 * 数组去重
 *
 * @param arr
 * @returns
 */
export function uniq(arr: Array<any>): Array<any> {
  return [...new Set(arr)];
}
