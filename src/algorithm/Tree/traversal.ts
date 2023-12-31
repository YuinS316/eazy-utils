import type { TreeNodeLike } from '@/structure/node';

/**
 * 前序遍历 - 递归版本
 * @param {TreeNodeLike<T>} root 树的根节点
 * @returns 遍历的node的val数组
 * @example
//  实现
function preOrderTraversal<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  preOrderTraversalHandler(root, result);
  return result;
}
function preOrderTraversalHandler<T>(root: TreeNodeLike<T>, result: T[]) {
  if (root !== null) {
    result.push(root.val);
    preOrderTraversalHandler(root.left, result);
    preOrderTraversalHandler(root.right, result);
  }
}

//  测试用例
`
Example tree:
         1
        / \
       2   3
      / \
     4   5
`

const root = createSampleTree();
const result = preOrderTraversal(root);

expect(result).toEqual([1, 2, 4, 5, 3]);
 */
export function preOrderTraversal<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  preOrderTraversalHandler(root, result);
  return result;
}

function preOrderTraversalHandler<T>(root: TreeNodeLike<T>, result: T[]) {
  if (root !== null) {
    result.push(root.val);
    preOrderTraversalHandler(root.left, result);
    preOrderTraversalHandler(root.right, result);
  }
}

/**
 * 前序遍历 - 栈版本
 * @param {TreeNodeLike<T>} root 树的根节点
 * @returns 遍历的node的val数组
 * @example
function preOrderTraversalInStack<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  const stack: TreeNodeLike<T>[] = [root];

  while (stack.length !== 0) {
    const node = stack.pop();
    if (node) {
      result.push(node.val);
      stack.push(node.right);
      stack.push(node.left);
    }
  }
  return result;
}
 */
export function preOrderTraversalInStack<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  const stack: TreeNodeLike<T>[] = [root];

  while (stack.length !== 0) {
    const node = stack.pop();
    if (node) {
      result.push(node.val);
      stack.push(node.right);
      stack.push(node.left);
    }
  }
  return result;
}

/**
 * 中序遍历 - 递归版本
 * @param {TreeNodeLike<T>} root 树的根节点
 * @returns 遍历的node的val数组
 * @example
function inOrderTraversal<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  inOrderTraversalHandler(root, result);
  return result;
}
function inOrderTraversalHandler<T>(root: TreeNodeLike<T>, result: T[]) {
  if (root !== null) {
    inOrderTraversalHandler(root.left, result);
    result.push(root.val);
    inOrderTraversalHandler(root.right, result);
  }
}
 */
export function inOrderTraversal<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  inOrderTraversalHandler(root, result);
  return result;
}
function inOrderTraversalHandler<T>(root: TreeNodeLike<T>, result: T[]) {
  if (root !== null) {
    inOrderTraversalHandler(root.left, result);
    result.push(root.val);
    inOrderTraversalHandler(root.right, result);
  }
}

/**
 * 后续遍历
 * @param {TreeNodeLike<T>} root 树的根节点
 * @returns 遍历的node的val数组
 * @example
function postOrderTraversal<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  postOrderTraversalHandler(root, result);
  return result;
}
function postOrderTraversalHandler<T>(root: TreeNodeLike<T>, result: T[]) {
  if (root !== null) {
    postOrderTraversalHandler(root.left, result);
    postOrderTraversalHandler(root.right, result);
    result.push(root.val);
  }
}

 */
export function postOrderTraversal<T>(root: TreeNodeLike<T>) {
  const result: T[] = [];
  postOrderTraversalHandler(root, result);
  return result;
}

function postOrderTraversalHandler<T>(root: TreeNodeLike<T>, result: T[]) {
  if (root !== null) {
    postOrderTraversalHandler(root.left, result);
    postOrderTraversalHandler(root.right, result);
    result.push(root.val);
  }
}
