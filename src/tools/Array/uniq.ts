/**
 * 数组去重
 *
 * @param arr
 * @returns {Array<any>} 去重的数组
 */
export function uniq(arr: Array<any>): Array<any> {
  return [...new Set(arr)];
}
