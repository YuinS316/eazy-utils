/* eslint-disable no-console */
import { join } from 'node:path';
import process from 'node:process';
import * as fs from 'node:fs';
import * as esbuild from 'esbuild';

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
async function build() {
  await esbuild.build({
    entryPoints: [
      join(process.cwd(), 'src/index.ts'),
    ],
    bundle: true,
    minify: true,
    sourcemap: true,
    splitting: true,
    outdir: 'lib',
    format: 'esm',
    target: ['esnext'],
  }).catch(() => process.exit(1));
}

async function main() {
  await calcCostTime('Build', build);
}

main();
