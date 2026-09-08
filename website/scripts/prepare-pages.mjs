import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function preparePages({ inputDir, outputDir, prefix }) {
  if (!/^[A-Za-z0-9_-]+$/.test(prefix)) throw new Error('Provide a single repository name.');
  await mkdir(outputDir, { recursive: true });
  for (const entry of await readdir(inputDir, { withFileTypes: true })) {
    if (entry.name === '.vite' || entry.name === 'vinext-client-entry-manifest.json') continue;
    const source = join(inputDir, entry.name);
    if (entry.name === prefix && entry.isDirectory()) {
      for (const child of await readdir(source)) await cp(join(source, child), join(outputDir, child), { recursive: true });
    } else await cp(source, join(outputDir, entry.name), { recursive: true });
  }
  await writeFile(join(outputDir, '.nojekyll'), '');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await preparePages({ inputDir: resolve('dist/client'), outputDir: resolve('dist/pages'), prefix: process.argv[2] });
}
