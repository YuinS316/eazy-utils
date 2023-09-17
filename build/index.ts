/* eslint-disable no-console */
import { join } from 'node:path';
import process from 'node:process';
import { build } from 'esbuild';

/**
 * calculate cb cost time
 *
 * @param name
 * @param cb
 */
async function calcCostTime(name: string, cb: () => void) {
  const startTime = new Date().getTime();

  await cb();

  const endTime = new Date().getTime();

  const diffTime = endTime - startTime;
  console.log(`============ ${name} Finished ==============`);
  console.log(`Cost ${diffTime} ms`);
}

/**
 * begin bundle
 */
async function bundle() {
  const entry = join(process.cwd(), 'src/tools/index.ts');
  const buildTsConfig = join(process.cwd(), 'tsconfig.build.json');
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
