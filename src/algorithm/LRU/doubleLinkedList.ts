export class DoubleLinkedNode {
  public prev: DoubleLinkedNode | null;
  public next: DoubleLinkedNode | null;

  constructor(public key: number, public value: number) {
    this.prev = null;
    this.next = null;
  }
}

export class LRU {
  public dummy: DoubleLinkedNode;
  public keyToMap: Map<number, DoubleLinkedNode>;

  constructor(public capacity: number) {
    this.dummy = new DoubleLinkedNode(-1, -1);
    this.dummy.prev = this.dummy;
    this.dummy.next = this.dummy;
    this.keyToMap = new Map();
  }

  //  获取节点，并会将其更新为最新的节点
  getNode(key: number) {
    if (!this.keyToMap.has(key))
      return null;

    const node = this.keyToMap.get(key);

    this.remove(node!);
    this.putFront(node!);

    return node;
  }

  get(key: number) {
    const node = this.getNode(key);
    return node ? node.value : -1;
  }

  put(key: number, value: number) {
    let node = this.getNode(key);
    if (node) {
      node.value = value;
      return;
    }

    // const node = new Node(key, value);
    node = new DoubleLinkedNode(key, value);
    this.keyToMap.set(key, node);
    this.putFront(node);

    //  大于容量，需要获取链表中最后一个节点删除（即哑结点的前一个）
    if (this.keyToMap.size > this.capacity) {
      const oldestNode = this.getOldestNode()!;
      this.remove(oldestNode);
      this.keyToMap.delete(oldestNode.key);
    }
  }

  getOldestNode() {
    return this.dummy.prev;
  }

  //  将节点从链表中移除
  remove(node: DoubleLinkedNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  //  将节点塞到链表头部(哑结点之后)
  putFront(node: DoubleLinkedNode) {
    node.next = this.dummy.next;
    node.prev = this.dummy;

    this.dummy.next!.prev = node;
    this.dummy.next = node;
  }
}
