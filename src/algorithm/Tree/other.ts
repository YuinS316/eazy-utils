import { Queue } from '@/structure';
import type { TreeNode } from '@/structure/node';

/**
 * 翻转二叉树 - BFS版本
 * @param {TreeNode | null} root 树的根节点
 * @returns 翻转后的树的根节点
 * @example
function reverseTreeBFS(root: TreeNode | null): TreeNode | null {
  if (root === null)
    return null;
 
  const queue = new Queue<TreeNode>();
  queue.enqueue(root);
 
  while (queue.size !== 0) {
    const size = queue.size;
 
    for (let i = 0; i < size; i++) {
      const node = queue.dequeue()!;
 
      //  跟普通的层序遍历没区别，从左到右
      if (node.left)
        queue.enqueue(node.left);
 
      if (node.right)
        queue.enqueue(node.right);
 
      //  此时交换节点后，再从队列取出就是翻转后的节点（即从右往左）
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
  }
 
  return root;
}
 */
export function reverseTreeBFS(root: TreeNode | null): TreeNode | null {
  if (root === null)
    return null;

  const queue = new Queue<TreeNode>();
  queue.enqueue(root);

  while (queue.size !== 0) {
    const size = queue.size;

    for (let i = 0; i < size; i++) {
      const node = queue.dequeue()!;
      if (node.left)
        queue.enqueue(node.left);

      if (node.right)
        queue.enqueue(node.right);

      const temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
  }

  return root;
}

/**
 * 翻转二叉树 - DFS
 * @param {TreeNode | null} root 树的根节点
 * @returns 翻转后的树的根节点
 * @example
function reverseTreeDFS(root: TreeNode | null): TreeNode | null {
  if (root === null)
    return null;

  const temp = root.left;
  root.left = reverseTreeDFS(root.right);
  root.right = reverseTreeDFS(temp);

  return root;
}
 */
export function reverseTreeDFS(root: TreeNode | null): TreeNode | null {
  if (root === null)
    return null;

  const temp = root.left;
  root.left = reverseTreeDFS(root.right);
  root.right = reverseTreeDFS(temp);

  return root;
}
