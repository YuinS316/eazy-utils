/**
 * 二分查找
 * @param {number[]} arr 已排序的数组
 * @param {number} target 目标元素
 * @returns {number} 目标元素的索引，没找到返回-1
 * @example
 *
export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (arr[mid] === target)
      return mid;
    else if (arr[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }
  return -1;
}
 */
export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (arr[mid] === target)
      return mid;

    else if (arr[mid] < target)
      left = mid + 1;

    else
      right = mid - 1;
  }

  return -1;
}
