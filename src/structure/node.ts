export type NodeLike<T = unknown> = Node<T> | null;

export class Node<T = unknown> {
  public next: NodeLike<T>;

  public value: T;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
