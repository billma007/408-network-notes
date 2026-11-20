import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';

const root = path.resolve('public');
const walk = async dir => (await Promise.all((await readdir(dir, {withFileTypes:true})).filter(e=>!e.name.startsWith('._')).map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : path.join(dir,e.name)))).flat();
const files = await walk(root);
const pages = files.filter(p => p.endsWith('.html'));
assert(pages.length >= 29, '应生成首页及全部28篇讲义页面');
const broken = [];
for (const file of pages) {
  const $ = cheerio.load(await readFile(file,'utf8'));
  for (const element of $('a[href],img[src],link[rel="stylesheet"],script[src]').toArray()) {
    const attr = $(element).attr('href') || $(element).attr('src');
    if (!attr || /^(https?:|data:|mailto:|tel:|javascript:|#)/.test(attr)) continue;
    const target = decodeURIComponent(attr.split(/[?#]/)[0]);
    const relative = target.startsWith('/408-network-notes/') ? target.slice('/408-network-notes/'.length) : target.startsWith('/') ? target.slice(1) : null;
    let resolved = relative !== null ? path.join(root,relative) : path.resolve(path.dirname(file),target);
    if (target.endsWith('/')) resolved = path.join(resolved,'index.html');
    try { await access(resolved); } catch { broken.push({file:path.relative(root,file),target}); }
  }
}
assert.equal(broken.length,0,JSON.stringify(broken.slice(0,30),null,2));
const tcp = await readFile(path.join(root,'wiki/network/5-3/index.html'),'utf8');
assert(tcp.includes('20581') && tcp.includes('TIME-WAIT'), 'TCP正文应完整保留');
const distilled = await readFile(path.join(root,'wiki/network/distilled/index.html'),'utf8');
assert(distilled.includes('katex'), '公式应渲染');
const search = await readFile(path.join(root,'search.json'),'utf8');
assert(search.includes('ARP') && search.includes('知识点蒸馏'), '全文搜索应覆盖讲义');
console.log(`检查通过：${pages.length}个页面，所有本地链接及资源可用，正文、公式、搜索索引正常。`);
