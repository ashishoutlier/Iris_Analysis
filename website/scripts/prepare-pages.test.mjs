import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { preparePages } from './prepare-pages.mjs';
test('places assets at the paths served below the GitHub repository prefix', async () => {
  const root = await mkdtemp(join(tmpdir(), 'book-pages-'));
  try {
    const inputDir = join(root, 'input'), outputDir = join(root, 'output');
    await mkdir(join(inputDir, 'EDA_Book_Sales', '_next', 'static'), { recursive: true });
    await writeFile(join(inputDir, 'index.html'), '<script src="/EDA_Book_Sales/_next/static/app.js"></script>');
    await writeFile(join(inputDir, 'EDA_Book_Sales', '_next', 'static', 'app.js'), 'window.ready = true;');
    await preparePages({ inputDir, outputDir, prefix: 'EDA_Book_Sales' });
    const html = await readFile(join(outputDir, 'index.html'), 'utf8').catch(() => null);
    assert.equal(html, '<script src="/EDA_Book_Sales/_next/static/app.js"></script>');
    assert.equal(await readFile(join(outputDir, '_next', 'static', 'app.js'), 'utf8'), 'window.ready = true;');
    assert.equal(await readFile(join(outputDir, '.nojekyll'), 'utf8'), '');
  } finally { await rm(root, { recursive: true, force: true }); }
});
