import { Queue } from '@/structure';
import type { TreeNode } from '@/structure/node';

/**
 * 翻转二叉树 - BFS版本
 * @param root 树的根节点
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
 * @param root
 */
export function reverseTreeDFS(root: TreeNode | null): TreeNode | null {
  if (root === null)
    return null;

  const temp = root.left;
  root.left = reverseTreeDFS(root.right);
  root.right = reverseTreeDFS(temp);

  return root;
}
