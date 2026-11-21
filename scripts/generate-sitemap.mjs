import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://www.servicesupporthub.in';
const OUT_DIR = path.resolve('out');
const SITEMAP_SIZE = 5000;

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

async function collectHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_next') continue;
      files.push(...await collectHtmlFiles(fullPath));
      continue;
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.html')) continue;
    files.push(fullPath);
  }

  return files;
}

function filePathToUrl(filePath) {
  let relativePath = path.relative(OUT_DIR, filePath).split(path.sep).join('/');
  if (relativePath.toLowerCase() === '404.html' || relativePath.toLowerCase() === '404/index.html') return null;
  if (relativePath.toLowerCase() === '_not-found.html' || relativePath.toLowerCase() === '_not-found/index.html') return null;

  if (relativePath === 'index.html') return `${SITE_URL}/`;
  if (relativePath.endsWith('/index.html')) {
    relativePath = relativePath.slice(0, -'index.html'.length);
    const encoded = relativePath.split('/').filter(Boolean).map(encodeURIComponent).join('/');
    return `${SITE_URL}/${encoded}/`;
  }

  relativePath = relativePath.slice(0, -'.html'.length);
  const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
  return `${SITE_URL}/${encoded}`;
}

async function main() {
  const stat = await fs.stat(OUT_DIR).catch(() => null);
  if (!stat?.isDirectory()) {
    throw new Error('Static export folder "out" was not found. Run "next build" before sitemap generation.');
  }

  const htmlFiles = await collectHtmlFiles(OUT_DIR);
  const entries = [];

  for (const filePath of htmlFiles) {
    const url = filePathToUrl(filePath);
    if (!url) continue;
    const fileStat = await fs.stat(filePath);
    entries.push({ url, lastmod: fileStat.mtime.toISOString() });
  }

  const uniqueEntries = [...new Map(entries.map((entry) => [entry.url, entry])).values()]
    .sort((a, b) => a.url.localeCompare(b.url));

  if (uniqueEntries.length === 0) {
    throw new Error('No exported HTML pages were found in "out". Sitemap was not generated.');
  }

  // Remove stale sitemap files from previous builds before writing the new set.
  const oldFiles = await fs.readdir(OUT_DIR);
  for (const name of oldFiles) {
    if (/^sitemap(?:-\d+)?\.xml$/i.test(name) || /^sitemap-index\.xml$/i.test(name)) {
      await fs.rm(path.join(OUT_DIR, name), { force: true });
    }
  }

  const chunks = [];
  for (let i = 0; i < uniqueEntries.length; i += SITEMAP_SIZE) {
    chunks.push(uniqueEntries.slice(i, i + SITEMAP_SIZE));
  }

  const writeUrlSet = async (chunk, fileName) => {
    const body = chunk.map(({ url, lastmod }) =>
      `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`
    ).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
    await fs.writeFile(path.join(OUT_DIR, fileName), xml, 'utf8');
  };

  if (chunks.length === 1) {
    await writeUrlSet(chunks[0], 'sitemap.xml');
  } else {
    for (let i = 0; i < chunks.length; i++) {
      await writeUrlSet(chunks[i], `sitemap-${i}.xml`);
    }

    const sitemapNodes = chunks.map((_, i) =>
      `  <sitemap>\n    <loc>${SITE_URL}/sitemap-${i}.xml</loc>\n  </sitemap>`
    ).join('\n');
    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapNodes}\n</sitemapindex>\n`;
    await fs.writeFile(path.join(OUT_DIR, 'sitemap.xml'), indexXml, 'utf8');
  }

  console.log(`\nSitemap generated from exported HTML: ${uniqueEntries.length} URLs`);
  console.log(`Sitemap files: ${chunks.length} (${SITEMAP_SIZE} URLs maximum per file)`);
  console.log(`Main sitemap: ${path.join(OUT_DIR, 'sitemap.xml')}`);
}

main().catch((error) => {
  console.error('\nSitemap generation failed:', error.message);
  process.exitCode = 1;
});
