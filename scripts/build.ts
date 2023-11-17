import { join } from 'node:path';
import process from 'node:process';
import { build } from 'esbuild';
import config from './config';
import { calcCostTime } from './utils';

const { buildEntryPath, buildTsconfigPath } = config;

/**
 * begin bundle
 */
async function bundle() {
  const entry = buildEntryPath;
  const buildTsConfig = buildTsconfigPath;
  try {
    await build({
      entryPoints: [
        entry,
      ],
      outdir: 'lib',
      bundle: true,
      // minify: true,
      sourcemap: true,
      splitting: true,
      format: 'esm',
      target: ['esnext'],
      tsconfig: buildTsConfig,
    });
  }
  catch (e) {
    process.exit(1);
  }
}

async function main() {
  await calcCostTime('Build', bundle);
}

main();
