import { describe, expect, it } from 'vitest';
import { reverseTreeBFS, reverseTreeDFS } from '../other';
import { preOrderTraversalInStack } from '../traversal';
import { createOneSideTree, createSampleTree } from './helper';

describe('Other', () => {
  describe('reverse binary tree', () => {
    describe('BFS', () => {
      it('should get null when root is null', () => {
        const reverseTree = reverseTreeBFS(null);
        expect(reverseTree).toBe(null);
      });

      it('should return reverse tree when root is sample tree', () => {
        const root = createSampleTree();
        const reverseTree = reverseTreeBFS(root);
        const result = preOrderTraversalInStack(reverseTree);
        expect(result).toEqual([1, 3, 2, 5, 4]);
      });

      it('should return reverse tree when root is one side tree', () => {
        const root = createOneSideTree();
        const reverseTree = reverseTreeBFS(root);
        const result = preOrderTraversalInStack(reverseTree);
        expect(result).toEqual([1, 2, 5, 4]);
      });
    });

    describe('DFS', () => {
      it('should get null when root is null', () => {
        const reverseTree = reverseTreeDFS(null);
        expect(reverseTree).toBe(null);
      });

      it('should return reverse tree when root is sample tree', () => {
        const root = createSampleTree();
        const reverseTree = reverseTreeDFS(root);
        const result = preOrderTraversalInStack(reverseTree);
        expect(result).toEqual([1, 3, 2, 5, 4]);
      });

      it('should return reverse tree when root is one side tree', () => {
        const root = createOneSideTree();
        const reverseTree = reverseTreeDFS(root);
        const result = preOrderTraversalInStack(reverseTree);
        expect(result).toEqual([1, 2, 5, 4]);
      });
    });
  });
});
