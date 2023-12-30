import { DoubleLinkedNode } from './doubledNode';

/**
 * LRU（Least Recently Used）算法实现。
 *
 * @class
 * @classdesc LRU 使用双向链表的版本，详细解析看链接2
 * @link https://leetcode.cn/problems/lru-cache/
 * @link https://juejin.cn/post/7288504491505844263
 */
export class LRU {
  /**
   * 哑结点，作为双向链表的头结点。
   * @type {DoubleLinkedNode}
   */
  public dummy: DoubleLinkedNode;
  /**
   * 存储键到节点的映射，用于快速查找节点。
   * @type {Map<number, DoubleLinkedNode>}
   */
  public keyToMap: Map<number, DoubleLinkedNode>;

  /**
   * 创建LRU实例
   *
   * @constructor
   * @param {number} capacity 最大容量
   * @example
   constructor(public capacity: number) {
    this.dummy = new DoubleLinkedNode(-1, -1);
    this.dummy.prev = this.dummy;
    this.dummy.next = this.dummy;
    this.keyToMap = new Map();
  }
   */
  constructor(public capacity: number) {
    this.dummy = new DoubleLinkedNode(-1, -1);
    this.dummy.prev = this.dummy;
    this.dummy.next = this.dummy;
    this.keyToMap = new Map();
  }

  /**
   * 获取指定键对应的节点，并将其更新为最新的节点。
   *
   * @param {number} key - 要查找的键。
   * @returns {DoubleLinkedNode | undefined} 返回查找到的节点，如果不存在则返回 null。
   * @example
   getNode(key: number) {
    if (!this.keyToMap.has(key))
      return null;

    const node = this.keyToMap.get(key);

    this.remove(node!);
    this.putFront(node!);

    return node;
  }
   */
  getNode(key: number) {
    if (!this.keyToMap.has(key))
      return null;

    const node = this.keyToMap.get(key);

    this.remove(node!);
    this.putFront(node!);

    return node;
  }

  /**
   * 获取指定键对应的值。
   *
   * @param {number} key - 要查找的键。
   * @returns {number} 返回查找到的值，如果不存在则返回 -1。
   * @example
   get(key: number) {
    const node = this.getNode(key);
    return node ? node.value : -1;
  }
   */
  get(key: number) {
    const node = this.getNode(key);
    return node ? node.value : -1;
  }

  /**
   * 向 LRU 中插入新的键值对。
   *
   * @param {number} key - 要插入的键。
   * @param {number} value - 要插入的值。
   * @returns {void}
   * @example
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
   */
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

  /**
   * 获取链表中最老的节点。
   *
   * @returns {DoubleLinkedNode | null} 返回最老的节点，如果链表为空则返回 null。
   * @example
   getOldestNode() {
    return this.dummy.prev;
  }
   */
  getOldestNode() {
    return this.dummy.prev;
  }

  /**
   * 从链表中移除指定节点。
   *
   * @param {DoubleLinkedNode} node - 要移除的节点。
   * @returns {void}
   * @example
   remove(node: DoubleLinkedNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
   */
  remove(node: DoubleLinkedNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  /**
   * 将节点插入链表头部（哑结点之后）。
   *
   * @param {DoubleLinkedNode} node - 要插入的节点。
   * @returns {void}
   * @example
   putFront(node: DoubleLinkedNode) {
    node.next = this.dummy.next;
    node.prev = this.dummy;
   
    this.dummy.next!.prev = node;
    this.dummy.next = node;
  }
   */
  putFront(node: DoubleLinkedNode) {
    node.next = this.dummy.next;
    node.prev = this.dummy;

    this.dummy.next!.prev = node;
    this.dummy.next = node;
  }
}
