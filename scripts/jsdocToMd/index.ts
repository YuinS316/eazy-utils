import fs from 'fs-extra';
import fg, { async } from 'fast-glob';
import jsdoc2md from 'jsdoc-to-markdown';
import to from 'await-to-js';
import config from '../config';
import { calcCostTime, deleteDirectory } from '../utils';

const { mdTemplatePath, mdDirPath, srcDirPath, jsdocConfigPath } = config;

const template = fs.readFileSync(mdTemplatePath, 'utf-8');

async function main() {
  await calcCostTime('Clean docs', async () => await deleteDirectory(mdDirPath));
  await handleGetEntries();
  // await deleteDirectory(mdDirPath);
}

interface MarkdownDir {
  root: string
  output: string
  fileName: string
}

async function handleGetEntries() {
  const markdownDirs = await calcCostTime('Read Files', getEntries);

  if (markdownDirs !== null)
    await calcCostTime('Generate markdown', async () => await handleGenerate(markdownDirs!));
}

async function getEntries() {
  const items = await fg([`${srcDirPath}/**/*.ts`, `!${srcDirPath}/**/__tests__/*`]);

  const trimPrefixItems = items.map(path => path.replace(srcDirPath, ''));

  const regx = /^\/([^\/]+)\/([^\/]+)\/([^\/]+)\.ts$/;

  //  过滤掉那些导出文件
  const markdownDirs: MarkdownDir[] = trimPrefixItems.filter(path => path.match(regx)).map((path) => {
    const match = path.match(regx);
    const [, category, subcategory, fileName] = match!;
    return {
      root: `${srcDirPath}${path}`,
      output: `${mdDirPath}/${category}/${subcategory}`,
      fileName,
    };
  });

  return markdownDirs;
}

async function handleGenerate(markdownDirs: MarkdownDir[]) {
  await Promise.all(markdownDirs.map(item => generateMd(item)));
}

async function generateMd({ root, output, fileName }: MarkdownDir) {
  const [err, mdStr] = await to(jsdoc2md.render({
    template,
    'example-lang': 'javascript',
    'files': root,
    'name-format': 'backticks',
    'heading-depth': 2,
    'module-index-format': 'none',
    'configure': jsdocConfigPath,
  }));

  if (err) {
    console.error(`生成文档错误,当前参数为${root}`);
    console.error(err);
  }
  else {
    //  有内容才去写文件
    if (mdStr !== '')
      await fs.outputFile(`${output}/${fileName}.md`, mdStr);
  }
}

main();
