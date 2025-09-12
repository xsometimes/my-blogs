
1. md预览组件  
[commonmark](https://github.com/commonmark/commonmark.js)
[react-markdown](https://github.com/remarkjs/react-markdown)
[remark-gfm](https://github.com/remarkjs/remark-gfm)
2. tag


3. seo 
- 每一篇文章的meta title应该变为文章的title



6. ai赋能
- 问答系统：读者可以通过输入问题，由 AI 快速给出回答和相关文章推荐。
- 多语言翻译：将您的文章自动翻译成多种语言，扩大读者群体。



模块
1. 精选项目：工具类
2. 学习笔记

试下自定义  [custom-app](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

[css 主题](https://tailwindcss.com/docs/theme#using-a-custom-theme)


博客参考
[1](https://hila-chefer.github.io/)
[2](https://www.bmpi.dev/)
[3]()



要加数据库吗？ 存什么东西
写一个脚本，往上增加一个md文档，
 data文件中的，去修改articleList, 还有tagList
 这个脚本 还可以执行删除 命令



 还有 案例列表，咋处理，自己写啰





 ## 使用
 1. 修改增加一次文档 + 跑npm run buildArticles 
 2. 删除 .DS_Store
```cmd
ls -la
find . -name .DS_Store -type f -delete
```

3. 常用命令
- 性能分析： ANALYZE=true npm run build