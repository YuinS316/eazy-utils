import { TreeNode } from '@/structure/node';

export function createSampleTree(): TreeNode<number> {
  /*
  Example tree:
          1
         / \
        2   3
       / \
      4   5
  */
  return new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
}

export function createOneSideTree(): TreeNode<number> {
  /*
  Example tree:
          1
         /
        2
       / \
      4   5
  */
  return new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), null);
}
