/**
 * 快速排序
 *
 * @version v1 返回新数组
 * @param {number[]} arr 需要排序的数组
 * @returns {number[]} 排序后的新数组
 */

export function quickSortV1(arr: number[]): number[] {
  if (arr.length <= 1)
    return arr;

  const pivot = arr[0];

  //  特别注意不要把基元入纳进去
  const leftArr = arr.filter((item, index) => item <= pivot && index !== 0);

  const rightArr = arr.filter(item => item > pivot);

  return [...quickSortV1(leftArr), pivot, ...quickSortV1(rightArr)];
}

/**
 * 快速排序
 *
 * @version v2 原地排序版本
 * @param {number[]} arr 需要排序的数组
 * @returns {number[]} 原地排序后的数组
 */
export function quickSortV2(arr: number[]) {
  return quickSortHelper(arr, 0, arr.length - 1);
}

/**
 * 递归排序
 *
 * @param arr
 * @param startIndex
 * @param endIndex
 */
function quickSortHelper(arr: number[], startIndex: number, endIndex: number): number[] {
  if (startIndex < endIndex) {
    const pivot = partition(arr, startIndex, endIndex);
    quickSortHelper(arr, startIndex, pivot - 1);
    quickSortHelper(arr, pivot + 1, endIndex);
  }

  return arr;
}

/**
 * 从startIndex -> endIndex中，将比基元小的放到左边，比基元大的防右边，最后返回
 *
 * @param arr
 * @param startIndex
 * @param endIndex
 */
function partition(arr: number[], startIndex: number, endIndex: number): number {
  const pivot = arr[startIndex];

  let left = startIndex + 1;
  let right = endIndex;

  while (true) {
    while (left <= right && arr[left] < pivot)
      left++;

    while (left <= right && arr[right] >= pivot)
      right--;

    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }

    else { break; }
  }

  [arr[startIndex], arr[right]] = [arr[right], arr[startIndex]];
  return right;
}
