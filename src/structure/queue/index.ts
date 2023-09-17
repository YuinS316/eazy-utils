type NodeLike<T = unknown> = Node<T> | null;

class Node<T = unknown> {
  public next: NodeLike<T>;

  public value: T;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

/**
 *  链表实现的队列
 */
export class Queue<T = unknown> {
  private head: NodeLike<T>;
  private tail: NodeLike<T>;
  private _size: number;

  get size() {
    return this._size;
  }

  constructor() {
    this.head = this.tail = null;
    this._size = 0;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  enqueue(value: T) {
    const node = new Node<T>(value);
    if (!this.head) {
      this.head! = node;
      this.tail! = node;
    }
    else {
      this.tail!.next = node;
      this.tail! = this.tail!.next!;
    }

    this._size++;
  }

  dequeue() {
    const current = this.head;

    if (!current)
      return undefined;

    this.head! = this.head!.next!;
    this._size--;
    return current.value;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current! = current!.next!;
    }
  }
}
