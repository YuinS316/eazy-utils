//  ========== 链表 ==========
export type NodeLike<T = unknown> = Node<T> | null;

export class Node<T = unknown> {
  public next: NodeLike<T>;

  public value: T;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

//  ========== 树 ==========
export type TreeNodeLike<T> = TreeNode<T> | null;

export class TreeNode<T = unknown> {
  public val: T;
  public left: TreeNodeLike<T>;
  public right: TreeNodeLike<T>;

  constructor(val: T, left?: TreeNodeLike<T>, right?: TreeNodeLike<T>) {
    this.val = val;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}
