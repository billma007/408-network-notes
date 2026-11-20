// Stellar 2.0.0 applies url_for twice to its default home breadcrumb
// under a Hexo project root. Normalize only this duplicated project prefix.
hexo.extend.filter.register('after_render:html', html => {
  const root = hexo.config.root;
  if (!root || root === '/') return html;
  return html.split(root + root.slice(1)).join(root);
});
