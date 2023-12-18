export class MaxHeap {
  public heap: number[] = [];

  /**
   * 最大堆
   * @param heap
   */
  constructor(

  ) {

  }

  insert(value: number) {
    this.heap.push(value);
    this.heapifyUp(this.size() - 1);
  }

  //  移除堆顶的元素
  pop() {
    if (!this.isEmpty()) {
      this.heap[0] = this.heap.pop()!;
      this.heapifyDown(0);
    }
  }

  //  添加元素时，进行上移
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

  //  移除元素时，进行下移
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

  //  查看堆顶元素
  peek() {
    return this.heap[0];
  }

  //  返回堆的大小
  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  //  交互堆元素元素
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  getParentIndex(i: number): number {
    return (i - 1) >> 1;
  }

  getLeftIndex(i: number): number {
    return i * 2 + 1;
  }

  getRightIndex(i: number): number {
    return i * 2 + 2;
  }
}
