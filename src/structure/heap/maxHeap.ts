/**
 * MaxHeap 最大堆
 *
 * @class
 * @classdesc MaxHeap 最大堆
 */
export class MaxHeap {
  /**
   * 存储元素
   * @type {number[]}
   */
  public heap: number[] = [];

  /**
   * 创建实例
   *
   * @constructor
   * @returns {void}
   */
  constructor() {

  }

  /**
   * 插入元素
   * @param {number} value 需要插入的元素
   * @returns {void}
   */
  insert(value: number) {
    this.heap.push(value);
    this.heapifyUp(this.size() - 1);
  }

  /**
   * 移除堆顶的元素
   * @returns {number | undefined} 返回堆顶的元素
   */
  pop() {
    if (!this.isEmpty()) {
      const old = this.heap.pop()!;
      this.heap[0] = old;
      this.heapifyDown(0);
      return old;
    }
    return undefined;
  }

  /**
   *
   * 添加元素时，进行上移
   * @param {number} i 需要上移的索引
   * @returns {void}
   */
  private heapifyUp(i: number) {
    if (i === 0)
      return;

    const parentIndex = this.getParentIndex(i);

    //  递归，目前元素比父元素大就交换
    if (this.heap[parentIndex] < this.heap[i]) {
      this.swap(parentIndex, i);
      this.heapifyUp(parentIndex);
    }
  }

  /**
   * 移除元素时，进行下移
   * @param {number} i 需要下移的索引
   * @returns {void}
   */
  private heapifyDown(i: number) {
    const leftIndex = this.getLeftIndex(i);
    const rightIndex = this.getRightIndex(i);
    let maxIndex = i;

    //  判断下左右是否越界，取最大的作为坐标
    if (leftIndex < this.size() && this.heap[leftIndex] > this.heap[maxIndex])
      maxIndex = leftIndex;

    if (rightIndex < this.size() && this.heap[rightIndex] > this.heap[maxIndex])
      maxIndex = rightIndex;

    if (maxIndex !== i) {
      this.swap(maxIndex, i);
      this.heapifyDown(maxIndex);
    }
  }

  /**
   * 查看堆顶元素
   * @returns {number | undefined} 返回堆顶的元素
   */
  peek() {
    return this.heap[0];
  }

  /**
   * 返回堆的大小
   * @returns {number} 堆的大小
   */
  size() {
    return this.heap.length;
  }

  /**
   * 返回堆是否是空的
   * @returns {boolean} 堆是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 交互堆中的元素
   * @param {number} i 交换的元素坐标
   * @param {number} j 被交换的元素坐标
   * @returns {void}
   */
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * 返回传入索引上一层的索引
   * @param {number} i 索引
   * @returns {number} 上一层的索引
   */
  getParentIndex(i: number): number {
    return (i - 1) >> 1;
  }

  /**
   * 返回传入索引的左子索引
   * @param {number} i 索引
   * @returns {number} 左子索引
   */
  getLeftIndex(i: number): number {
    return i * 2 + 1;
  }

  /**
   * 返回传入索引的右子索引
   * @param {number} i 索引
   * @returns {number} 右子索引
   */
  getRightIndex(i: number): number {
    return i * 2 + 2;
  }
}
