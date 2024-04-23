import { defineConfig } from 'vitepress';
import { getSideListSync } from '../../scripts/utils';
import config from '../../scripts/config';

const { MD_DIR } = config;

//  坑爹的vitepress不支持异步，所以要支持同步的获取
// const sideList = getSideListSync();

export default defineConfig({
  // site-level options
  title: 'Eazy Utils',
  description: 'A utils library make easy to lean typescript',
  base: '/',
  srcDir: 'doc',
  themeConfig: {
    // theme-level options
    // sidebar: sideList,
    nav: [
      // { text: '算法', link: '/doc/algorithm/Sort/quickSort', activeMatch: '/doc/algorithm/' },
      // { text: '工具函数', link: '/doc/tools/concurrentLimit/', activeMatch: '/doc/tools/' },
      // { text: '数据结构', link: '/doc/structure/queue/index', activeMatch: '/doc/structure/' },
      // { text: '设计模式', link: '/doc/pattern/eventEmitter/index', activeMatch: '/doc/pattern/' },
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
  markdown: {
    lineNumbers: true,
  },
});
