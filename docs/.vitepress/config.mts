import { defineConfig } from 'vitepress';
import { getSideListSync } from '../../scripts/utils';
import config from '../../scripts/config';

const { MD_DIR } = config;

//  坑爹的vitepress不支持异步，所以要支持同步的获取
const sideList = getSideListSync();

export default defineConfig({
  // site-level options
  title: 'Eazy Utils',
  description: 'A utils library make easy to lean typescript',
  base: '/',
  themeConfig: {
    // theme-level options

    sidebar: sideList,
    docFooter: {
      prev: false,
      next: false,
    },
  },
});
