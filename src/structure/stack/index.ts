import type { NodeLike } from '../node';
import { Node } from '../node';

export class Stack<T = unknown> {
  private _head: NodeLike<T>;
  private _tail: NodeLike<T>;
  private _size = 0;

  constructor() {
    this._head = this._tail = null;
  }

  get size() {
    return this._size;
  }

  get head() {
    return this._head?.value;
  }

  push(value: T) {
    const node = new Node(value);
    if (!this._head) {
      this._tail = node;
      this._head = this._tail;
    }
    else {
      node.next = this._head;
      this._head = node;
    }

    this._size++;
  }

  pop() {
    const current = this._head;
    if (!current)
      return undefined;

    this._head = this._head!.next;
    this._size--;
    return current.value;
  }

  clear() {
    this._head = this._tail = null;
    this._size = 0;
  }

  *[Symbol.iterator]() {
    let current = this._head;

    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }
}
