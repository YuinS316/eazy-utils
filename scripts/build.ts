import process from 'node:process';
import { build } from 'esbuild';
import config from './config';
import { calcCostTime, deleteDirectory } from './utils';

const { buildEntryPath, buildTsconfigPath, buildOutputPath } = config;

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
  await calcCostTime('Delete lib', () => deleteDirectory(buildOutputPath));
  await calcCostTime('Build', bundle);
}

main();
