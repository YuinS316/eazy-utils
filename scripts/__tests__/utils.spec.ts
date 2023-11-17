import { describe, expect, it } from 'vitest';
import { buildCategoryTree } from '../utils';
import config from '../config';

describe('build utils', () => {
  const { mdDirPath } = config;
  it('test same directory', () => {
    const filePath = [
      `${mdDirPath}/algorithm/Sort/bubbleSort.md`,
      `${mdDirPath}/algorithm/Sort/quickSort.md`,
    ];

    const tree = buildCategoryTree(filePath, 'doc');
    expect(tree).toEqual([
      {
        text: 'algorithm',
        items: [
          {
            text: 'Sort',
            items: [
              {
                text: 'bubbleSort',
                link: '/doc/algorithm/Sort/bubbleSort',
              },
              {
                text: 'quickSort',
                link: '/doc/algorithm/Sort/quickSort',
              },
            ],
          },
        ],
      },
    ]);
  });

  it('test same directory and filenames only contains "index.ts"', () => {
    const filePath = [
      `${mdDirPath}/pattern/eventEmitter/index.md`,
      `${mdDirPath}/pattern/singleton/index.md`,
    ];

    const tree = buildCategoryTree(filePath, 'doc');
    expect(tree).toEqual([
      {
        text: 'pattern',
        items: [
          {
            text: 'eventEmitter',
            link: '/doc/pattern/eventEmitter/index',
          },
          {
            text: 'singleton',
            link: '/doc/pattern/singleton/index',
          },
        ],
      },
    ]);
  });

  it('test different directory', () => {
    const filePath = [
      `${mdDirPath}/algorithm/Sort/bubbleSort.md`,
      `${mdDirPath}/tools/Compose/index.md`,
    ];

    const tree = buildCategoryTree(filePath, 'doc');
    expect(tree).toEqual([
      {
        text: 'algorithm',
        items: [
          {
            text: 'Sort',
            items: [
              {
                text: 'bubbleSort',
                link: '/doc/algorithm/Sort/bubbleSort',
              },
            ],
          },
        ],
      },
      {
        text: 'tools',
        items: [
          {
            text: 'Compose',
            link: '/doc/tools/Compose/index',
          },
        ],
      },
    ]);
  });
});
