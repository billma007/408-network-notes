const MarkdownIt = require('markdown-it');
const math = require('@traptitech/markdown-it-katex');
const parser = new MarkdownIt({html:true, breaks:false, typographer:false}).use(math, {
  throwOnError: false,
  trust: false
});
function render(data, options) {
  hexo.execFilterSync('markdown-it:renderer', parser);
  return options?.inline ? parser.renderInline(data.text) : parser.render(data.text);
}
for (const extension of ['md','markdown','mkd','mkdn','mdwn']) {
  hexo.extend.renderer.register(extension, 'html', render, true);
}
