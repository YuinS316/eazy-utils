import { describe, expect, it } from 'vitest';
import { inOrderTraversal, postOrderTraversal, preOrderTraversal, preOrderTraversalInStack } from '../traversal';
import { TreeNode } from '@/structure/node';

describe('Tree Traversal', () => {
  const createSampleTree = (): TreeNode<number> => {
    /*
    Example tree:
            1
           / \
          2   3
         / \
        4   5
    */
    return new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
  };

  it('should perform pre-order traversal', () => {
    const root = createSampleTree();
    const result = preOrderTraversal(root);

    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  it('should perform pre-order traversal in stack', () => {
    const root = createSampleTree();
    const result = preOrderTraversalInStack(root);

    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  it('should perform in-order traversal', () => {
    const root = createSampleTree();
    const result = inOrderTraversal(root);

    expect(result).toEqual([4, 2, 5, 1, 3]);
  });

  it('should perform post-order traversal', () => {
    const root = createSampleTree();
    const result = postOrderTraversal(root);

    expect(result).toEqual([4, 5, 2, 3, 1]);
  });
});
