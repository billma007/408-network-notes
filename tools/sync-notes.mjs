import {readdir,readFile,writeFile,mkdir,copyFile,unlink} from 'node:fs/promises';
import path from 'node:path';

const prefix='/408-network-notes';
const input=path.resolve('content/network');
const output=path.resolve('source/wiki/network');
const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).filter(e=>!e.name.startsWith('.')).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();
const files=await walk(input);
const docs=files.filter(p=>p.endsWith('.md')).sort((a,b)=>a.localeCompare(b,'zh-CN',{numeric:true}));
const keyFor=p=>{
  const name=path.basename(p);
  if(name.startsWith('00-'))return 'index';
  if(name.startsWith('01-'))return 'distilled';
  if(name.includes('结课自测'))return 'quiz';
  if(name.includes('视频覆盖'))return 'coverage';
  const match=name.match(/^(\d+)\.(\d+)/);
  if(!match)throw Error('未知文档:'+p);
  return match[1]+'-'+match[2];
};
const mapping=new Map(docs.map(p=>[p,keyFor(p)]));
const urlFor=key=>prefix+'/wiki/network/'+(key==='index'?'':key+'/');
await mkdir(output,{recursive:true});
await mkdir('source/assets/network',{recursive:true});
await mkdir('source/vendor/katex/fonts',{recursive:true});
await copyFile('node_modules/katex/dist/katex.min.css','source/vendor/katex/katex.min.css');
for(const font of await readdir('node_modules/katex/dist/fonts')){
  if(!font.startsWith('.'))await copyFile('node_modules/katex/dist/fonts/'+font,'source/vendor/katex/fonts/'+font);
}
const chapterGroups=new Map();
for(const doc of docs){
  const key=mapping.get(doc);
  let body=await readFile(doc,'utf8');
  const title=body.split('\n')[0].replace(/^#\s*/,'');
  body=body.replace(/^# .*\n+/,'');
  body=body.replace(/(!?\[[^\]\n]*\])\((<[^>]+>|[^)\n]+)\)/g,(whole,label,target)=>{
    target=target.replace(/^<|>$/g,'');
    if(/^(https?:|#)/.test(target))return whole;
    const resolved=path.resolve(path.dirname(doc),target);
    if(mapping.has(resolved))return label+'('+urlFor(mapping.get(resolved))+')';
    if(resolved.endsWith('.jpg'))return label+'('+prefix+'/assets/network/'+path.basename(resolved)+')';
    throw Error('无法转换内部链接:'+target);
  });
  const front=['---','title: '+JSON.stringify(title),'collection:','  profile: wiki','  id: network','comments:','  enabled: false','footer:','  license: false','  share: []','---',''];
  await writeFile(path.join(output,key+'.md'),front.join('\n')+body);
  const chapter=path.basename(path.dirname(doc));
  if(/^第\d章/.test(chapter)){
    chapterGroups.set(chapter,[...(chapterGroups.get(chapter)||[]),key]);
  }
}
for(const image of files.filter(p=>p.endsWith('.jpg'))){
  await copyFile(image,path.join('source/assets/network',path.basename(image)));
}
const tree=['name: 计算机网络强化','description: 从课堂讲解到考前速查，24节强化讲义。','route:','  path: /wiki/network/','navigation:','  tree:','    快速开始:','      - index','      - distilled','      - quiz'];
for(const [chapter,keys] of chapterGroups){
  tree.push('    '+chapter+':',...keys.map(k=>'      - '+k));
}
tree.push('    材料说明:','      - coverage','footer:','  license: false','  share: []');
await mkdir('source/_data/wiki',{recursive:true});
await writeFile('source/_data/wiki/network.yml',tree.join('\n')+'\n');
await writeFile('source/_data/wiki.yml','- network\n');
// exFAT creates AppleDouble metadata which Hexo's YAML scanner treats as data.
// Only these OS metadata files in generated sources/theme are removed.
const cleanMetadata=async dir=>{
  for(const item of await readdir(dir,{withFileTypes:true})){
    const file=path.join(dir,item.name);
    if(item.isFile() && item.name.startsWith('._'))await unlink(file);
    else if(item.isDirectory())await cleanMetadata(file);
  }
};
await cleanMetadata('source');
await cleanMetadata('node_modules/hexo-theme-stellar');
console.log('已同步'+docs.length+'篇文档与6张配图。');
