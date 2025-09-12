


1. 指定文件下载类型
文件 url 的 response header 中的 `content-disposition` 配置了 `attachment:
Content-Disposition: attachment; filename="an example.txt"; filename*=utf-8''an example.txt`
原因：是否下载取决于响应头中的内容类型，你可以检查你的网络服务器是否设置了适当的头信息，如Content-Type: application/pdf。这个需要后端配置
解决办法：
后端修改请求头。
前端去掉请求头。
使用vue-pdf或其他插件实现预览功能
[x](./002.png)


2. iframe允许加载其他html
[x](./001.png)


2. 在线文档展示

[](https://mozilla.github.io/pdf.js/web/viewer.html)



