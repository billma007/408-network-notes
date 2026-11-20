# 计算机网络强化知识库

使用 Hexo 8.1.2 和 [Stellar 2.0.0](https://github.com/xaoxuu/hexo-theme-stellar) 整理的个人学习网站。

网站：https://billma.top/408-network-notes/

GitHub 默认地址 https://billma007.github.io/408-network-notes/ 会随现有个人主页设置跳转到上述自定义域名。原个人主页仍在 https://billma.top/ 。

包括24篇小节讲义、知识点蒸馏、闭卷自测、材料覆盖记录和6张教学配图。原课程内容及配图权利归原作者所有，本文档为个人学习整理；主题许可见其原仓库。本仓库不包含原视频、识别缓存或账户凭据。

## 本地阅读

需要 Node.js 22 或以上版本：

```sh
npm ci
npm run build
npm run check
npm start
```

打开终端中给出的地址并加上路径 `/408-network-notes/`。

## 更新讲义

原始Markdown及配图保存在 `content/network/`，修改后运行 `npm run build`，网站会自动重建章节目录和内部链接。生成页面在 `source/wiki/network/`，不要只改生成页面。所有相对文档链接会转换为网站地址，公式在构建时渲染，全文搜索由Stellar生成。

推送到main后，GitHub Actions会自动检查和发布到本仓库的GitHub Pages项目路径，不影响现有个人主页。材料损坏和课程未覆盖范围见网站中的覆盖记录。
