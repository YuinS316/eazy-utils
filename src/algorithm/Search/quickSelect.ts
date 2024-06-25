/**
 * 快速选择算法，返回第k小的元素
 * @param {number[]} arr 数组
 * @param {number} k  第k小的元素
 * @returns {number | undefined} 返回第k小的元素
 */
export function quickSelect(arr: number[], k: number): number | undefined {
  let left = 0;
  let right = arr.length - 1;
  k = k - 1;

  while (left <= right) {
    const pivot = partition(arr, left, right);
    if (pivot === k)
      return arr[pivot];

    else if (pivot < k)
      left = pivot + 1;

    else
      right = pivot - 1;
  }

  return undefined;
}

/**
 * 在数组中执行分区操作，用于快速选择算法或快速排序算法。
 *
 * @param {number[]} arr - 待分区的数组。
 * @param {number} left - 分区的起始索引。
 * @param {number} right - 分区的结束索引。
 * @returns {number} - 分区后主元素的最终索引。
 */
function partition(arr: number[], left: number, right: number): number {
  //  分区的起始索引
  const start = left;

  //  主元素，选择分区的第一个元素作为主元素
  const pivot = arr[start];

  // 将左指针向右移动一位，准备开始比较
  left++;

  while (left <= right) {
    // 在左侧找到第一个大于等于主元素的元素
    while (left <= right && arr[left] < pivot)
      left++;

    // 在右侧找到第一个小于主元素的元素
    while (left <= right && arr[right] >= pivot)
      right--;

    // 如果左指针仍然小于等于右指针，则交换左右指针处的元素
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  // 将主元素放到最终的位置，并返回最终索引
  [arr[start], arr[right]] = [arr[right], arr[start]];

  return right;
}
