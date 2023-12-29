export class DoubleLinkedNode {
  public prev: DoubleLinkedNode | null;
  public next: DoubleLinkedNode | null;

  constructor(public key: number, public value: number) {
    this.prev = null;
    this.next = null;
  }
}
