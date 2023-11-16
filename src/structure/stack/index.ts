import type { NodeLike } from '../node';
import { Node } from '../node';

export class Stack<T = unknown> {
  private head: NodeLike<T>;
  private tail: NodeLike<T>;
  private _size = 0;

  constructor() {
    this.head = this.tail = null;
  }

  get size() {
    return this._size;
  }

  getHead() {
    return this.head?.value;
  }

  push(value: T) {
    const node = new Node(value);
    if (!this.head) {
      this.tail = node;
      this.head = this.tail;
    }
    else {
      node.next = this.head;
      this.head = node;
    }

    this._size++;
  }

  pop() {
    const current = this.head;
    if (!current)
      return undefined;

    this.head = this.head!.next;
    this._size--;
    return current.value;
  }

  clear() {
    this.head = this.tail = null;
    this._size = 0;
  }

  *[Symbol.iterator]() {
    let current = this.head;

    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }
}
