import { describe, expect, it } from 'vitest';
import { inOrderTraversal, postOrderTraversal, preOrderTraversal, preOrderTraversalInStack } from '../traversal';
import { createSampleTree } from './helper';

describe('Tree Traversal', () => {
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
