import { Node } from '../node';
import type { NodeLike } from '../node';

/**
 *  链表实现的队列
 */
export class Queue<T = unknown> {
  private _head: NodeLike<T>;
  private _tail: NodeLike<T>;
  private _size: number;

  get size() {
    return this._size;
  }

  constructor() {
    this._head = this._tail = null;
    this._size = 0;
  }

  get head() {
    return this._head?.value;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  enqueue(value: T) {
    const node = new Node<T>(value);
    if (!this._head) {
      this._head! = node;
      this._tail! = node;
    }
    else {
      this._tail!.next = node;
      this._tail! = this._tail!.next!;
    }

    this._size++;
  }

  dequeue() {
    const current = this._head;

    if (!current)
      return undefined;

    this._head! = this._head!.next!;
    this._size--;
    return current.value;
  }

  *[Symbol.iterator]() {
    let current = this._head;
    while (current) {
      yield current.value;
      current! = current!.next!;
    }
  }
}
