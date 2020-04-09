module.exports = {
  title: "银犁后端Vue开发指南",
  description: "使用教程",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/images/logo.png" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/html-doc/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  plugins: [
    // 这是 VuePress 默认主题使用这个插件的方式
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': '提示',
        },
      },
    ],
  ],
  themeConfig: {
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    // 侧边栏显示2级
    sidebarDepth: 2,
    sidebar: [
      { title: "首页", path: "/" },
      {
        title: "组件使用",
        collapsable: false,
        children: [
          {
            title: "商品选择",
            path: "/commodityChoice/",
          },
        ],
      },
    ],
  },
};
