import type { Node, NodeLike } from '../node';

export class LinkedList<T = unknown> {
  private _head: NodeLike<T>;
  private _tail: NodeLike<T>;
  private _size = 0;

  constructor() {
    this._head = null;
    this._tail = null;
  }

  get size() {
    return this._size;
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }

  //  添加节点,
  insert(node: Node<T>, index?: number) {
    //  如果index < 0
    if (index !== undefined && index < 0)
      return;

    //  初始化加入节点
    if (!this._head) {
      this._head = node;
      this._tail = node;
      this._size++;
      return;
    }

    //  没有指定位置 或者 index大于size 就往最后插入
    if (index === undefined || index >= this._size) {
      this._tail!.next = node;
      this._tail = node;
      this._size++;
      return;
    }

    //  插入到头结点
    if (index === 0) {
      node.next = this._head;
      this._head = node;
      this._size++;
      return;
    }

    //  其他情况
    let prev: NodeLike<T> = null;
    let current = this._head;
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        node.next = current;
        prev!.next = node;
        this._size++;
        return;
      }

      prev = current;
      current = current.next as Node<T>;
    }
  }

  //  移除节点
  remove(index: number) {
    //  越界情况
    if (index < 0 || index >= this._size)
      return null;

    let prev: NodeLike<T> = null;
    let current = this._head;

    //  如果移除的是头结点
    if (index === 0) {
      const current = this._head;

      this._head = this._head!.next;

      //  如果此时head为null，说明链表已经没有节点了
      if (this._head === null)
        this._tail = null;

      this._size--;
      return current;
    }

    //  其他情况
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        prev!.next = current!.next;

        //  如果移除的是尾节点，需要更新tail
        if (i === this._size - 1)
          this._tail = prev!;

        this._size--;
        return current;
      }

      prev = current;
      current = current!.next;
    }
  }

  //  打印
  log(): T[] {
    let current = this._head;
    const result: T[] = [];
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}
