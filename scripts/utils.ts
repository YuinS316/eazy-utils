import ora from 'ora';
import to from 'await-to-js';
import fg from 'fast-glob';
import config from './config';

const { srcDirPath, MD_DIR, mdDirPath } = config;

/**
 * calculate cb cost time
 *
 * @param name
 * @param cb
 */
export async function calcCostTime<T = any>(name: string, cb: () => Promise<T>): Promise<Awaited<T | null>> {
  const loading = ora(`${name} starting ....`);

  let result: T | null = null;

  loading.start();

  const executeTask = async () => {
    const startTime = new Date().getTime();

    result = await cb();

    const endTime = new Date().getTime();

    const diffTime = endTime - startTime;

    return diffTime;
  };

  const [err, diffTime] = await to<number>(executeTask());

  if (err) {
    loading.fail(`${name} failed`);
    console.error(err);
  }
  else {
    loading.succeed(`${name} finished (${diffTime} ms)`);
  }

  return result;
}

interface SidebarItem {
  text?: string
  link?: string
  items?: SidebarItem[]
  nextLink?: boolean
};

/**
 * 同步的获取侧边栏
 * @returns
 */
export function getSideListSync() {
  const items = fg.globSync([`${mdDirPath}/**/*.md`]);

  return buildCategoryTree(items, MD_DIR);
}

/**
 * 构造出vitest符合的文件路径
 *
 * @param pathList 通过fast-glob获取到全部的文件文件路径
 * @param prefix
 */
export function buildCategoryTree(pathList: string[], prefix: string): SidebarItem[] {
  const trimPrefixPathList = pathList.map(item => item.replace(mdDirPath, ''));

  const regx = /^\/([^\/]+)\/([^\/]+)\/([^\/]+)\.md$/;

  //  key为category
  const tempMap: Record<string, any> = {};

  trimPrefixPathList.forEach((path) => {
    const match = path.match(regx);

    if (match) {
      const [, category, subcategory, fileName] = match;

      if (!tempMap[category])
        tempMap[category] = {};

      const categoryMap = tempMap[category];

      if (!categoryMap[subcategory])
        categoryMap[subcategory] = [];

      const subcategoryList = categoryMap[subcategory];
      subcategoryList.push({
        text: fileName,
        link: `/${prefix}/${category}/${subcategory}/${fileName}`,
      });
    }
  });

  const result: SidebarItem[] = [];
  Object.keys(tempMap).forEach((category) => {
    const items: SidebarItem[] = [];

    Object.keys(tempMap[category]).forEach((subcategory) => {
      const innerItems = tempMap[category][subcategory];

      // 只有一个文件且那个文件叫index.md就扁平成二级目录;
      const shouldFlat = isFlatten(innerItems);

      if (shouldFlat) {
        items.push({
          ...innerItems[0],
          text: subcategory,
        });
      }
      else {
        items.push({
          text: subcategory,
          items: innerItems,
        });
      }
    });

    result.push({
      text: category,
      items,
    });
  });

  return result;
}

//  判断是否扁平
function isFlatten(fileList: SidebarItem[]) {
  const INDEX_NAME = 'index';

  const isOnlyOneFile = fileList.length <= 1;

  return isOnlyOneFile && fileList[0].text === INDEX_NAME;
}
