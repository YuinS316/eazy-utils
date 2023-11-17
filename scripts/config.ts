import { join } from 'node:path';
import process from 'node:process';

const MD_DIR = 'doc';

export default {
  MD_DIR,
  //  打包的入口路径
  buildEntryPath: join(process.cwd(), 'src/index.ts'),
  //  打包对应的tsconfig路径
  buildTsconfigPath: join(process.cwd(), 'tsconfig.build.json'),

  //  src
  srcDirPath: join(process.cwd(), 'src'),
  //  markdown生成的文件夹
  mdDirPath: join(process.cwd(), 'docs/doc'),
  // jsdoc 配置文件
  jsdocConfigPath: join(process.cwd(), 'scripts/jsdocToMd', 'jsdoc.config.json'),
  // hbs 模板文件：用于配置生成的 markdown：语法见：https://github.com/jsdoc2md/dmd
  mdTemplatePath: join(process.cwd(), 'scripts/jsdocToMd', 'template.hbs'),
};
