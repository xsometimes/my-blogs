## split chunks、SplitChunksPlugin

webpack 构建项目的assets，让所有非js资源，在js世界下的规则处理。

module：一个ts文件、图片、less、pug等；

bundle：打包后的产物/一个js文件，一个js文件对应一个bundle，一个bundle可以包含多个module；

chunk：对于打包产物bundle，有些情况下太大了，为了优化性能，比如快速打开首屏等，需要对bundle进行拆分，拆分出来的东西叫chunk

性能优化点SplitChunksPlugin：
- 将被多个Chunk依赖的包分离成独立的Chunk，防止资源重复；
- node_modukes中的资源通常变动较少，可以抽成一个独立的包，业务代码的频繁变动不会导致这部分第三方资源缓存失效，被无意义的重复加载





[详解 SplitChunks，详解 Webpack 分包策略](https://juejin.cn/post/7444898039272947763)
[webpack 拆包：关于 splitChunks 的几个重点属性解析](https://segmentfault.com/a/1190000042093955)

