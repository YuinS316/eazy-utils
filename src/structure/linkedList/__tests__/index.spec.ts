import { beforeEach, describe, expect, it } from 'vitest';
import { LinkedList } from '..';
import { Node } from '../../node';

describe('linkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('insert element', () => {
    it('insert without index', () => {
      const node0 = new Node(0);
      list.insert(node0);
      expect(list.size).toBe(1);
      expect(list.log()).toEqual([0]);
      expect(list.tail).toBe(node0);

      const node1 = new Node(1);
      list.insert(node1);
      expect(list.size).toBe(2);
      expect(list.log()).toEqual([0, 1]);
      expect(list.tail).toBe(node1);
    });

    it('insert to head', () => {
      //  准备操作
      const node0 = new Node(0);
      list.insert(node0);

      const node1 = new Node(1);
      list.insert(node1, 0);
      expect(list.log()).toEqual([1, 0]);
      expect(list.tail).toBe(node0);

      const node2 = new Node(2);
      list.insert(node2, 0);
      expect(list.log()).toEqual([2, 1, 0]);
      expect(list.size).toBe(3);
      expect(list.tail).toBe(node0);
    });

    it('insert inside', () => {
      const node0 = new Node(0);
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);
      const node4 = new Node(4);
      list.insert(node0);
      list.insert(node1);
      list.insert(node2, 1);
      expect(list.log()).toEqual([0, 2, 1]);
      list.insert(node3, 1);
      expect(list.log()).toEqual([0, 3, 2, 1]);
      list.insert(node4, 3);
      expect(list.log()).toEqual([0, 3, 2, 4, 1]);
      expect(list.size).toBe(5);
      expect(list.tail).toBe(node1);
    });

    it('insert index over than size', () => {
      const node0 = new Node(0);
      const node1 = new Node(1);
      list.insert(node0);
      list.insert(node1, 100);
      expect(list.log()).toEqual([0, 1]);
      expect(list.size).toBe(2);
      expect(list.tail).toBe(node1);
    });
  });

  describe('remove element', () => {
    it('remove head', () => {
      const node0 = new Node(0);
      list.insert(node0);

      const removedNode = list.remove(0);
      expect(removedNode).toBe(node0);
      expect(list.tail).toBe(null);
    });

    it('remove element inside', () => {
      const node0 = new Node(0);
      const node1 = new Node(1);
      list.insert(node0);
      list.insert(node1);

      list.remove(1);
      expect(list.log()).toEqual([0]);
      expect(list.tail).toBe(node0);
    });
  });
});
