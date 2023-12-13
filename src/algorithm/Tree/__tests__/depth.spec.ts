import { describe, expect, it } from 'vitest';
import { getMaxDepthQueue, getMaxDepthRecursion, getMinDepth } from '../depth';
import { createOneSideTree, createSampleTree } from './helper';

describe('calculate binary tree depth', () => {
  describe('calculate maximum depth of binary tree', () => {
    describe('Recursion', () => {
      it('should return 0 for an empty tree', () => {
        const result = getMaxDepthRecursion(null);
        expect(result).toBe(0);
      });

      it('should return the depth of a tree', () => {
        const root = createSampleTree();
        const depth = getMaxDepthRecursion(root);
        expect(depth).toBe(3);
      });
    });

    describe('Queue', () => {
      it('should return 0 for an empty tree', () => {
        const result = getMaxDepthQueue(null);
        expect(result).toBe(0);
      });

      it('should return the depth of a tree', () => {
        const root = createSampleTree();
        const depth = getMaxDepthQueue(root);
        expect(depth).toBe(3);
      });
    });
  });

  describe('calculate minimum depth of binary tree', () => {
    it('should return 2 for example tree', () => {
      const root = createSampleTree();
      const depth = getMinDepth(root);
      expect(depth).toBe(2);
    });

    it('should return 3 for one side tree', () => {
      const root = createOneSideTree();
      const depth = getMinDepth(root);
      expect(depth).toBe(3);
    });
  });
});
