// Use MarkdownIt's public token API; the bundled Hexo renderer's legacy
// anchor plugin imports a private path removed by current MarkdownIt.
hexo.extend.filter.register('markdown-it:renderer', parser => {
  if (parser.__notesAnchors) return;
  parser.__notesAnchors = true;
  parser.core.ruler.push('notes_heading_ids', state => {
    const counts = new Map();
    state.tokens.forEach((token, index) => {
      if (token.type !== 'heading_open') return;
      const text = state.tokens[index + 1]?.content || 'section';
      const base = text.trim().replace(/\s+/g, '-').replace(/[<>"]/g, '');
      const count = counts.get(base) || 0;
      counts.set(base, count + 1);
      token.attrSet('id', base + (count ? '-' + count : ''));
    });
  });
});
