import { Queue } from '@/structure';
import type { TreeNode } from '@/structure/node';

/**
 * 递归的计算树的最大高度
 * @link https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 * @param {TreeNode | null} root 树的根节点
 * @returns 树的深度
 * @example
function getMaxDepthRecursion(root: TreeNode | null): number {
  if (root === null)
    return 0;

  return Math.max(getMaxDepthRecursion(root.left), getMaxDepthRecursion(root.right)) + 1;
}
 */
export function getMaxDepthRecursion(root: TreeNode | null): number {
  if (root === null)
    return 0;

  return Math.max(getMaxDepthRecursion(root.left), getMaxDepthRecursion(root.right)) + 1;
}

/**
 * 通过层次遍历会计算树的最大高度
 * @param {TreeNode | null} root 树的根节点
 * @returns 树的深度
 * @example
function getMaxDepthQueue(root: TreeNode | null): number {
  if (root === null)
    return 0;
 
  const queue = new Queue<TreeNode>();
  queue.enqueue(root);
  let depth = 0;
 
  while (queue.size !== 0) {
    const size = queue.size;
 
    for (let i = 0; i < size; i++) {
      const node = queue.dequeue();
 
      if (node?.left)
        queue.enqueue(node.left);
 
      if (node?.right)
        queue.enqueue(node.right);
    }
 
    depth++;
  }
  //  每一层遍历完了再+1
  return depth;
}
 */
export function getMaxDepthQueue(root: TreeNode | null): number {
  if (root === null)
    return 0;

  const queue = new Queue<TreeNode>();
  queue.enqueue(root);
  let depth = 0;

  while (queue.size !== 0) {
    const size = queue.size;

    for (let i = 0; i < size; i++) {
      const node = queue.dequeue();

      if (node?.left)
        queue.enqueue(node.left);

      if (node?.right)
        queue.enqueue(node.right);
    }

    depth++;
  }

  return depth;
}

/**
 * 给定一个二叉树，找出其最小深度
 * @link https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
 * @param {TreeNode | null} root 树的根节点
 * @returns 树的最小深度
 * @example
function getMinDepth(root: TreeNode | null): number {
  //  访问到空节点的时候
  if (root === null)
    return 0;

  //  访问到叶节点的时候
  if (root.left === null && root.right === null)
    return 1;

  const leftDpth = getMinDepth(root.left);
  const rightDepth = getMinDepth(root.right);

  //  有一种特殊情况就是只有左子树或只有右子树，这时候需要取有子树的那一边的高度
  //  不然它另一边的永远是最小的返回0
  if (root.left === null || root.right === null) {
    //  为什么可以加起来，是因为没有子树的那边永远为0，不会影响结果
    return leftDpth + rightDepth + 1;
  }

  return Math.min(leftDpth, rightDepth) + 1;
}

 */
export function getMinDepth(root: TreeNode | null): number {
  //  访问到空节点的时候
  if (root === null)
    return 0;

  //  访问到叶节点的时候
  if (root.left === null && root.right === null)
    return 1;

  const leftDpth = getMinDepth(root.left);
  const rightDepth = getMinDepth(root.right);

  //  有一种特殊情况就是只有左子树或只有右子树，这时候需要取有子树的那一边的高度
  //  不然它另一边的永远是最小的返回0
  if (root.left === null || root.right === null) {
    //  为什么可以加起来，是因为没有子树的那边永远为0，不会影响结果
    return leftDpth + rightDepth + 1;
  }

  return Math.min(leftDpth, rightDepth) + 1;
}
