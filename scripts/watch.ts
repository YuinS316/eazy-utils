import { exec } from 'node:child_process';
import process from 'node:process';
import { promisify } from 'node:util';
import fs from 'fs-extra';
import to from 'await-to-js';
import ora from 'ora';
import config from './config';

const { srcDirPath } = config;
const delay = 200; // 延迟执行的时间，单位为毫秒

let timer: NodeJS.Timeout | null = null;
let watcher: fs.FSWatcher | null = null;

async function generateMarkdown() {
  const execAsync = promisify(exec);

  const [err] = await to(execAsync('npm run jsdoc2md'));

  if (err)
    console.error('npm run jsdoc2md failed');
}

function startWatching() {
  watcher = fs.watch(srcDirPath, { recursive: true }, (eventType, filename) => {
    const startTime = new Date().getTime();
    const loading = ora(`File ${filename} has changed ...`);

    loading.start();

    if (timer)
      clearTimeout(timer);

    timer = setTimeout(async () => {
      await generateMarkdown();
      const endTime = new Date().getTime();
      const diffTime = endTime - startTime;
      loading.succeed(`Regenerate markdown done (${diffTime}ms)`);
    }, delay);
  });
}

function stopWatching() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}

function main() {
  startWatching();
}

// Register exit event handler
process.on('exit', () => {
  stopWatching();
});

// Register additional signals for termination
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    console.log(`Received ${signal}, Exiting...`);

    // Add a delay or asynchronous operation here if needed
    await new Promise(resolve => setTimeout(resolve, 100));

    process.exit();
  });
});

main();
