




## 小白入门问题
1. 依赖注入
大白话，

```ts
@Module({
  providers: [
    MilkTeaMaker, // 声明奶茶类需要被管理
    MilkSupplier, // 声明牛奶供应商类需要被管理
  ],
})
export class TeaModule {}
```
nestjs相当于一个奶茶店的店长，统一管理统筹资源

```ts
// 奶茶类（依赖注入版）
class MilkTeaMaker {
  // 构造函数里声明需要牛奶（依赖）
  constructor(private readonly milkSupplier: MilkSupplier) {} 

  makeTea() {
    // 直接用店长给的牛奶，不用自己买
    const milk = this.milkSupplier.getMilk(); 
    // 做奶茶...
  }
}
```

当需要创建MilkTeaMaker时，就**声明**要用MilkSupplier，（不自己 new MilkSupplier()，而是等别人「注入」进来）。

如此，方便
- 解耦：奶茶类和牛奶供应商类分开
- 统一管理：所有依赖由容器集中管理，避免重复创建对象，节省资源。


2. nestjs与express的区别
Express是nodejs最早最流行的基础web框架，提供路由、中间件、请求处理等基础功能，但架构设计需开发者自行组织（如 MVC 模式需手动实现）
NestJS，是基于 Express（或 Fastify）的企业级应用框架，，通过 TypeScript 和装饰器提供强大的架构模式（如模块化、依赖注入、AOP），目标是解决大型项目的可维护性和扩展性问题。


3. class-validator中的useContainer的作用
类比前端的全局事件总线，


| **全局事件总线场景**                | **NestJS + class-validator 场景**       |
|-----------------------------------|----------------------------------------|
| 组件需要与其他组件通信             | 验证器需要使用 NestJS 中的服务          |
| 组件间原本无法直接交互             | 验证器与服务原本是分离的               |
| 全局事件总线作为中间层             | NestJS 容器作为中间层                  |
| 组件通过事件总线间接通信           | 验证器通过容器间接获取服务             |



4. 文件名为何都是双点命名法 `模块.类型.ts`？
- 模块化设计理念
- 受Angular的启发，NestJS 也采用了这种命名约定，以明确标识文件的用途和功能，降低学习成本


5. 各装饰器的核心功能
- @Module：组织代码的基本单位，将控制器、服务、中间件等组件组合成功能完整的模块
- @Controller：定义控制器，处理 HTTP 请求
- @Get、@Post、@Put、@Delete：定义路由方法

6. `@Module`装饰器中的`imports`属性
与依赖注入（Dependency Injection, DI）密切相关

imports 的核心作用：模块间依赖管理

设计思想：
- 单例模式：避免重复创建
- 解决依赖关系混乱：
    - 显式依赖声明：通过 imports 参数
    - 层次化注入：依赖关系形成树形结构，每个模块只需关心直接依赖的模块，降低复杂度

7. packagejson文件中scripts各命令的作用

```package.json
{
    "scripts": {
    // 执行 NestJS 项目的构建命令，会将 TypeScript 代码编译为 JavaScript 代码，输出到默认的 dist 目录
    "build": "nest build",

    // 使用 Prettier 工具格式化代码，会递归地对 src 目录和 test 目录下所有的 .ts 文件进行格式化
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",

    // 启动 NestJS 应用，默认情况下不会监听文件变化，启动一次后代码修改不会自动重启应用
    "start": "nest start",

    // 以开发模式启动 NestJS 应用，会监听文件变化，当代码修改后会自动重启应用，方便开发调试
    "start:dev": "nest start --watch",

    // 以调试模式启动 NestJS 应用，同时监听文件变化，支持使用调试工具（如 VS Code 的调试器）对应用进行调试
    "start:debug": "nest start --debug --watch",

    // 在生产环境中启动应用，直接运行编译后的 JavaScript 文件，该文件位于 dist 目录下的 main.js
    "start:prod": "node dist/main",

    // 使用 ESLint 工具对代码进行静态检查并尝试自动修复发现的问题，检查范围包括 src、apps、libs 和 test 目录下的所有 .ts 文件
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    
    // 使用 Jest 测试框架运行所有测试用例
    "test": "jest",

    // 使用 Jest 测试框架以监听模式运行测试用例，当测试文件或相关代码文件发生变化时，会自动重新运行受影响的测试用例
    "test:watch": "jest --watch",

    // 使用 Jest 测试框架运行测试并生成测试覆盖率报告
    "test:cov": "jest --coverage",

    // 以调试模式运行 Jest 测试用例，允许使用调试工具（如 VS Code 的调试器）对测试代码进行调试，同时使用 tsconfig-paths 和 ts-node 来处理 TypeScript 文件
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",

    // 使用 Jest 测试框架运行端到端（E2E）测试，指定使用 test 目录下的 jest-e2e.json 作为配置文件
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
}
```



8. 根目录下 `ecosystem.config.js`
与pm2 集群有关。
- 集群模式（Cluster Mode）， `exec_mode: 'cluster' + instances: cpuLen：`启动与CPU核心数量相同的应用实例，充分利用服务器硬件资源。例如，8 核 CPU 会启动 8 个 NestJS 实例。
- 负载均衡：PM2 内置负载均衡器，自动将 incoming 请求分发到多个实例，提高应用吞吐量和响应速度。
- 高可用性
  - `autorestart: true`:当某个实例崩溃或异常退出时，PM2 会自动重启该实例，确保服务始终可用。
  - `max_memory_restart: '1G'`:防止内存泄漏导致应用崩溃，超过内存限制时自动重启。
- 生产环境优化
  - `NODE_ENV: 'production'`：nestJS 会以生产模式运行，禁用调试信息，优化性能。
  - `watch: false`：禁用文件监控，提高启动速度。


9. `@VirtualColumn 装饰器`虚拟列
- 不存储在数据库中：仅在查询实体时**动态**生成
- 依赖其他字段：通常基于当前实体的其他字段（如外键）查询关联数据
- 提高查询效率：避免多次查询，在单次查询中直接获取关联数据

10. `InjectRepository`相关
Repository 在 TypeORM 中用于：
- 数据库操作：封装了数据库查询、插入、更新等操作
- 数据映射：将数据库查询结果映射为实体对象
- 事务管理：支持事务操作，确保数据一致性
- 依赖注入：可以通过构造函数注入到其他服务中，简化代码结构

以下两种写法等同
```tsx
// 依赖注入写q
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // readonly 确保属性在初始化后不能被重新赋值（但对象内部状态可修改）
  ) {}
}



// 传统写法
class UsersService {
  private userRepository: Repository<UserEntity>;
  
  constructor(repository: Repository<UserEntity>) {
    this.userRepository = repository;
  }
}
```

11. redis和mysql的关系
| **维度**         | **Redis（内存数据库）**                     | **MySQL（关系型数据库）**                |
|------------------|------------------------------------------|----------------------------------------|
| **数据存储**      | 内存（支持持久化到磁盘）                  | 磁盘（索引和缓存部分在内存）           |
| **数据结构**      | 键值对，支持复杂类型（字符串、哈希、列表、集合、有序集合等） | 结构化表格（行、列、关系）           |
| **读写性能**      | 极快（内存操作，单线程，QPS 约 10-100 万） | 较慢（磁盘 I/O，QPS 通常数千到数万）  |
| **持久化**        | 可选 RDB（快照）或 AOF（日志），异步持久化 | 事务日志（binlog）+ 数据文件，同步/异步 |
| **数据一致性**    | 弱一致性（主从复制异步）                  | 强一致性（事务支持 ACID）             |
| **水平扩展**      | 原生支持集群（Cluster），自动分片         | 需要分库分表中间件（如 ShardingSphere） |
| **查询能力**      | 简单查询（基于键），复杂操作需客户端实现   | 复杂查询（SQL 支持 JOIN、聚合等）      |
| **适用场景**      | 缓存、会话存储、计数器、排行榜、消息队列   | 结构化数据存储、复杂查询、事务处理     |

两者是互补关系。优先从 Redis 查询数据，命中则直接返回；未命中时从 MySQL 查询，并将结果写入 Redis。

流程：
- 写请求先写入 Redis（如 List 或 Stream 结构）；
- 后台消费者（Worker）异步批量写入 MySQL；
- 确保最终一致性。

Redis存储的内存，是指计算机的 随机存取存储器（Random Access Memory，RAM）——用于临时存储数据的硬件组件。
虽然内存数据易失，但 Redis 提供了 RDB（快照） 和 AOF（操作日志） 机制，将内存数据定期或实时同步到磁盘，实现数据持久化。

12. 几个与redis、缓存管理相关的库

| **库**                          | **优势**                              | **适用场景**                               |
|---------------------------------|---------------------------------------|------------------------------------------|
| `ioredis`                       | 功能完整、灵活控制 Redis               | 需要直接操作 Redis 命令的场景               |
| `@liaoliaots/nestjs-redis`      | 简化 NestJS 集成，支持多实例            | NestJS 项目中管理多个 Redis 连接             |
| `@nestjs/cache-manager`         | 声明式缓存，解耦存储实现                | 快速实现缓存功能，不关心底层存储              |
| `cache-manager-ioredis-yet`     | 连接 `@nestjs/cache-manager` 和 Redis   | 使用官方缓存模块，但需要 Redis 作为存储的场景   |



13. dist文件夹的生成
`npm run build` 命令会将 TypeScript 代码编译为 JavaScript 代码，输出到默认的 dist 目录。

| 文件	 | 核心作用	| 关键配置项 |
|---------------------------------|---------------------------------------|------------------------------------------|
| tsconfig.build.json	| 生产环境优化配置	| 继承 tsconfig.json，排除测试文件 |
| tsconfig.json	| TypeScript 基础编译配置	| compilerOptions, include, exclude |
| nest-cli.json	| Nest CLI 工具行为配置	| sourceRoot, collection, compilerOptions |

有一些配置涉及dist文件夹内部的生成，如：
- `tsconfig.build.json` 中的 `outDir`：指定编译后的 JavaScript 文件输出目录 生产环境输出目录
- `tsconfig.json` 中的 `rootDir`：指定 TypeScript 文件的根目录
- `nest-cli.json` 中的 `sourceRoot`：指定 TypeScript 文件的源目录 源码根目录
- exclude 配置：指定哪些文件或目录不应该被编译


14. Reflector 类实例
- 元数据：给数据附加描述性信息，这些信息本身不改变数据功能，但能指导程序（或人）如何处理数据。如快递包裹（里面是数据）上的快递单数据
  - 元数据的赋值：“写元数据” 的是装饰器，`装饰器通过 SetMetadata 函数将元数据存储到目标对象（如方法、类）上`
  - 为什么需要元数据？
    - JavaScript 的对象本身没有「自带的地方」存这些额外信息。
    - 元数据可以通过装饰器（Decorator）添加到类、方法、属性等元素上，从而在运行时获取这些额外信息。
    - 元数据可以用于实现 AOP（面向切面编程）、权限控制、日志记录等功能。
- Reflector：NestJS提供的反射工具，用于**读取**附加在控制器/方法上的元数据



15.  vue3 源码proxy为什么选择了reflect？
保持对象原有行为的完整性：
- Proxy 和 Reflect 的参数严格对应，拦截操作（如 get/set）不会破坏对象原有的 getter/setter 逻辑
- 没有 Reflect，Proxy 会破坏对象的默认行为（如 getter、原型链、this 绑定），导致各种诡异问题。两者配合才能实现 “拦截而不破坏” 的效果


16. nestjs为什么将各种信息放在元数据 reflect？
实现「声明式配置」与「运行时反射」
- 声明式配置：通过装饰器（如 @Controller、@Get、@Roles）在代码中直接标记元数据，无需额外配置文件。
- 运行时反射：框架启动时扫描元数据，动态构建路由、依赖注入、中间件等逻辑。


17. SetMetadata 源代码：装饰器底层确实基于 JavaScript 的 Reflect.defineMetadata 方法实现。



18. 当多个Token需要加入黑名单时，当多个Token需要加入黑名单时

```tsx
// 使用pipeline批量操作
const pipeline = this.redis.pipeline();
tokens.forEach(token => {
  pipeline.set(genTokenBlacklistKey(token), '1', 'EX', 3600);
});
await pipeline.exec();
```

- Redis支持pipeline批量写入
- 性能接近单次操作（约O(n)时间复杂度）


19. 数据表中的左右连接


- 外连接
  - 左连接：以左表为 “基准”，查左表全部 + 右表匹配项。
  - 右连接：以右表为 “基准”，查右表全部 + 左表匹配项。
- 内连接：仅返回两表中都有匹配的数据，不匹配的数据会被过滤



20. 数据库相关操作
1）初始化
sql 文件：[/deploy/sql/nest_admin.sql](./deploy/sql/nest_admin.sql) 用于数据库初始化

初始化的几种方式：
- 使用MySQL客户端直接执行 ：
```bash 
mysql -h localhost -P 13307 -u username -p breeze_admin < /path/to/nest_admin.sql
```
- 使用Navicat等数据库工具
- 通过Docker Compose初始化 （如果项目使用Docker）
```bash 
# 在docker-compose.yml中配置volumes挂载
services:
  mysql:
    volumes:
      - ./deploy/sql/nest_admin.sql:/docker-entrypoint-initdb.d/init.sql
```
- 通过TypeORM迁移 （如果项目配置了TypeORM）：
```bash 
npm run typeorm migration:run

# 上一条命令相当于运行此命令
# 设置环境变量，调用 typeorm-ts-node-esm CLI 工具，通过 -d 参数指定数据库配置文件路径，执行 migration:run 操作，运行所有待执行的数据库迁移脚本

cross-env NODE_ENV=development typeorm-ts-node-esm -d ./dist/config/database.config.js migration:run
```


2）修改数据库

对比前端工作流：Migration 与 Git 的相似性

|操作|	Migration	|Git|
|-------|------|--------|
|创建变更|	migration:generate	|git add/commit|
|应用变更到环境	|migration:run	|git push 到远程仓库|
|回滚变更	|migration:revert|	git revert|
|查看变更历史	|数据库中的 migrations 表	|git log|
|多人协作冲突解决|	手动修改 Migration 文件	|手动解决代码冲突|



3）最佳实践（前端视角）
- 永远不要手动修改生产数据库
  - 类似不要直接修改线上代码，所有变更都通过 Migration。
  - 每次修改实体后立即生成 Migration
  - 类似写完组件立即提交，避免积累大量变更导致冲突。
- 测试 Migration 的可回滚性
  = 每个 Migration 都要写 down() 方法，类似组件要支持卸载。（down() 方法就是数据库变更的「撤销脚本」，你需要确保它能按相反顺序、安全地撤销 up() 所做的一切）
- 在 CI/CD 中自动执行 Migration
  - 类似自动部署前端代码，数据库变更也应自动化。
- 避免在 Migration 中写复杂业务逻辑
  - Migration 只负责表结构变更，数据迁移用专门的脚本（类似组件只负责渲染，逻辑放 hooks）。





21. 文件目录说明

- src
  - migrations ypeORM 数据库迁移文件的存放目录，用于数据库版本控制、变更记录、自动执行、团队协作等
  - config
    - database.config.ts - 包含MySQL连接配置

- deploy/sql/breeze_admin.sql - 数据库初始化脚本
- env 存储数据库连接字符串等敏感信息


常用命令执行


|文件夹|	命令|用途|创建时机｜依赖|
|-------|------|--------|--------|--------|
|dist|------|--------|--------|--------|
|__data/mysql|docker-compose中 mysql的volumes|数据库数据挂载，用于数据持久化|首次执行docker-compose up时，若本地__data/mysql不存在，Docker 会直接创建该目录，并将容器内/var/lib/mysql的数据持久化到此处 |docker-compose.yml|
|deploy/sql|------|映射 SQL 脚本目录，容器启动时执行脚本初始化数据库结构和数据|需手动编写或通过工具导出后整理，用于初始化数据库|--------|

|src/migrations|pnpm run migration:create和migration:generate|数据库迁移文件的存放目录，用于数据库变更记录、自动执行、团队协作等，类似代码的git|--------|--------|


```yml
mysql

# 当执行docker compose up时：

# 首次启动会创建__data/mysql目录并初始化 MySQL 数据
# 同时执行deploy/sql下的所有 SQL 脚本，例如：
# 创建myapp_db数据库（若MYSQL_DATABASE已配置）
# 在数据库中创建表、插入数据
  volumes:
      - ./__data/mysql/:/var/lib/mysql/
      - ./deploy/sql/:/docker-entrypoint-initdb.d/ 



```



22. 新项目开始
- 1. npm run build 生成dist文件夹
- 2. docker compose启动mysql，若__data/mysql本地不存在，第一次启动会生成
- 3. 若src/migrations本地不存在，或者数据库版本、 内容有更新，执行迁移migration相关
- 4. docker启动redis服务，再启动项目服务 pnpm dev



23. 一些异步流处理方法

|技术 / 模式	|核心特点	|典型场景	|前端框架应用|
|-------|------|--------|--------|
|romise	|单次异步结果，链式调用	|AJAX 请求、文件读取	|原生 JS、所有框架|
|EventEmitter	|手动触发事件，多监听者模式	|Node.js 模块、自定义事件	|Node.js、Vue 自定义事件|
|Generator（*）	|可暂停的函数，用 yield 控制数据流	|复杂异步流程控制	|原生 JS、Redux-Saga|
|Async/Await	|Promise 的语法糖，用同步写法处理异步|	顺序执行多个异步操作|	原生 JS、React/Vue 组件|
Web API：			
|EventTarget	|DOM 事件监听（如 addEventListener）	|点击、滚动等 UI 事件|	所有前端框架|
|ReadableStream	|流式处理大文件或网络数据	|文件上传、视频流	|原生 JS、服务端渲染（SSR）|

响应式编程：			
|Observable（RxJS）	|基于推送的数据流，支持丰富操作符|	实时数据、复杂事件流	|Angular、React（配合库）|
|Signals（SolidJS）	|细粒度响应式原语，自动追踪依赖	|状态管理、UI 更新	|SolidJS、Vue（实验性）|

状态管理库：			
|Redux（Thunk/Saga）	|可预测的状态容器，支持异步中间件	|大型应用状态管理	|React、Vue|
| MobX	|基于 @observable 的响应式状态|	细粒度响应式更新	|React、Vue|



24. Rxjs中的几个核心

RxJS 的源码核心是通过 Observable、Observer、Subscription 三大类 和 操作符工厂函数，构建了一个基于「推送模式」的异步数据流处理系统，同时通过调度器实现了精确的时间控制，让开发者可以用统一的方式处理各种异步场景。

- Observable：天气预警通知器
  - 每个 Observable 是一块积木，操作符是连接积木的零件。
  - 你可以随意组合不同的积木（操作符），形成不同的流水线（链式调用），而且每次组合都不会破坏原来的积木。
  - 最后插上 “电源”（订阅），流水线才会启动，按顺序处理数据。

- Observer: 定义「数据来了之后要做什么」，多个 Observer（不同人）订阅
  - next(value)：当 Observable 发出新数据时，这个方法会被调用（比如收到一个苹果块）。
  - error(err)：当 Observable 出错时（比如流水线坏了），这个方法处理错误。
  - omplete()：当 Observable 结束发送数据时（比如水果处理完了），这个方法通知结束。

- Subscription： 订阅关系的管理者，是 Observable 和 Observer 之间的「合同」和「遥控器」，负责管理订阅关系的生命周期。
  - 管理资源释放
  - 取消订阅（切断数据流）
  - 组合多个 Subscription
- 操作符工厂函数
  - 像「乐高零件工厂」，生产各种功能的零件（操作符），你可以把这些零件拼在一起，组成任何你想要的玩具（数据流处理逻辑），而且拼错了可以随时拆了重拼
- Subscriber：既是 Observer，又是执行器 `class Subscriber<T> extends Subscription implements Observer<T>`
  - Subscriber 实现了 Observer 接口（有 next、error、complete 方法）。
  - 但它多了一个关键能力：主动控制数据流（比如取消订阅、重试）。

为什么需要 Subscription？直接让 Observer 取消订阅不行吗？
- 解耦职责：Subscription 专门负责 “管理订阅生命周期”，让 Observer 专注业务逻辑
- 资源安全：如果没有 Subscription，Observer 可能忘记取消订阅，导致资源泄漏（比如定时器一直运行）


25. sse断了重连机制
- 服务端：通过 req.on('close') 检测客户端断开
- 客户端：通过 EventSource 的 onerror 事件检测连接异常
  - 指数退避算法：每次重连间隔加倍，直到达到最大间隔（避免网络拥塞）
  - 带消息 ID 的重连：通过 lastEventId 参数让服务端知道客户端上次接收的消息


```tsx
// 客户端处理接收到的消息
class SSEClient {

  constructor(url) {
    this.retryInterval = 1000; // 初始重连间隔（毫秒）
    this.maxRetryInterval = 60000; // 最大重连间隔
  }

  this.source.onmessage = (event) => {
    console.log('Received:', event.data);
    this.lastEventId = event.lastEventId; // 记录最后接收的消息 ID
    this.retryInterval = 1000; // 重置重连间隔
  };


  // 安排重连（带指数退避） 
  // 当网络请求失败时，不要立即重试，而是 等待越来越长的时间后再试，以此减少对服务器的压力
  // 网络恢复需要时间：短时间内频繁重试可能在网络尚未完全恢复时进行，浪费资源。
  _scheduleReconnect() {
    // 使用指数退避算法计算下一次重连时间
    const nextInterval = Math.min(
      this.retryInterval * 2, 
      this.maxRetryInterval
    );

    this.retryInterval = nextInterval; // 1- 2 - 4 - 8 - 16 - 32- 60 - 60 取两者中小的一个，
  }
}
```


26. post发送消息给sse，sse回复
关联机制：
- 每个客户端通过唯一 ID 标识（如 sessionID、UUID）
- POST 请求中携带客户端 ID，服务器通过 ID 找到对应的 SSE 连接


```tsx
// sse部分
app.get('/sse', (req, res) => {
  const clientId = generateUniqueId();
  clients.set(clientId, res); // 保存响应对象
  
  // 发送初始消息
  res.write(`id: ${clientId}\n`);
  res.write(`data: {"clientId": "${clientId}"}\n\n`);
});





// 服务端收到 用户发送过来的消息后，
app.post('/message', (req, res) => {
  const { clientId, message } = req.body;
  
  // 验证客户端 ID
  if (!clientId || !clients.has(clientId)) {
    return res.status(400).json({ error: 'Invalid client ID' });
  }
  
  console.log(`收到来自 ${clientId} 的消息: ${message}`);
  
  // 处理消息（这里可以是任何业务逻辑）
  const responseMessage = `服务器已收到: ${message}`;
  
  // clientRes服务端存储的 客户端 SSE 响应
  // 当客户端建立 SSE 连接时，服务端会保存对应的 response 对象
  // 通过 SSE 连接回复客户端
  const clientRes = clients.get(clientId); 对象
  clientRes.write(`id: ${Date.now()}\n`);
  clientRes.write(`data: {"response": "${responseMessage}"}\n\n`);
  
  // 返回成功响应给 POST 请求
  res.status(200).json({ status: 'Message sent via SSE' });
});

```



27. sse + 数据以流的方式发送给客户端

28. 即时聊天是ws，还是sse+post？   todo ？？？？？？？？？






29. extends 和 implements的区别

|维度	|extends（继承）	|implements（实现）|
|-------|------|--------|
|关系	|子类与父类是「is-a」关系（猫是动物）。|	类与接口是「has-a」关系（鸟有飞行能力）。|
|数量限制	|只能 extends 一个父类（单继承）。	|可以 implements 多个接口（逗号分隔）。|
|代码复用	|直接复用父类的代码实现（比如 eat() 方法）。|	接口只定义方法签名，具体实现要自己写。|
|修改自由度	|可以重写父类的方法（override）。|	必须严格按照接口定义实现方法。|


30. 装饰器工厂和装饰器的异同

|特性	|装饰器（Decorator）	|装饰器工厂（Decorator Factory）|
|-------|------|--------|
|本质	|直接是一个函数|	返回装饰器函数的高阶函数|
|参数	|直接接收装饰目标（类 / 方法 / 属性）|	接收自定义参数，并返回装饰器函数|
|调用方式	|@decorator|	@decoratorFactory(param1, param2)|
|应用场景	|行为固定的装饰器	|需要动态配置的装饰器|
|执行时机	|类定义时立即执行	|先执行工厂函数，返回的装饰器再执行|

装饰器的限制：
- 装饰器的执行时机限制
  - 装饰器在 类定义时执行，而非实例化时。这意味着一旦类被定义，装饰器的行为就固定了，无法动态调整。
- 无法复用相同装饰器逻辑
  - 如果需要不同配置的装饰器（如不同的日志级别），普通装饰器需要重复实现

装饰器工厂如何解决这些问题？
虽然也是在类定义时的执行，但是它执行的是返回一个参数化、定制化的装饰器函数。
装饰器工厂的行为是在使用时配置，
- 分类配置与实现
  - 装饰器的 实现逻辑（如验证、缓存）只写一次
  - 通过 参数配置（如是否启用、超时时间）在不同场景复用
- 支持编译时动态性
  - 虽然装饰器在类定义时执行，但参数可以基于：环境变量（如 process.env）、配置文件（如 config.json）、编译时计算（如 BUILD_TIMESTAMP）



装饰器工厂是参数化的装饰器，通过高阶函数实现
装饰器工厂的使用场景：
- 参数化配置
- 条件性装饰
- 复用装饰器逻辑：多个类或方法需要相同的装饰器，但配置可能不同。
- 动态创建装饰器：根据运行时条件创建不同的装饰器。


31. nestjs中几个常见的装饰器工厂
@inject

```tsx


/**
 * 1. 依赖注入
 * 这是一个 给类的属性 的装饰器工厂
 * 自定义参数为 服务名serviceName，方便从容器中获取服务 ServiceContainer.get(serviceName)
 * 
 */
function inject(serviceName: string) {
  return function(target: any, propertyKey: string) {
    // 从容器中获取服务并注入到属性
    target[propertyKey] = ServiceContainer.get(serviceName);
  };
}

class UserController {
  @inject('UserService') // 动态注入服务
  private userService: UserService;
  
  getUser(id: string) {
    return this.userService.getUser(id);
  }
}




/**
 * 2. 缓存策略配置
 * 这是一个 给类的方法 的装饰器工厂
 * 自定义参数为 缓存时间maxAge，缓存键生成器keyGenerator
 */
function cache(maxAge: number, keyGenerator?: (args: any[]) => string) {
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const cache = new Map();
    
    descriptor.value = function(...args: any[]) {
      const key = keyGenerator ? keyGenerator(args) : args.join('-');
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = descriptor.value.apply(this, args);
      cache.set(key, result);
      
      // 设置缓存过期
      setTimeout(() => cache.delete(key), maxAge);
      
      return result;
    };
  };
}

class DataService {
  @cache(60000, (args) => `data-${args[0]}`) // 自定义缓存键生成器
  getData(id: string) {
    return fetch(`/api/data/${id}`);
  }
}


```



32. 动态类继承
JavaScript 允许在 **运行时动态创建类**，这是实现装饰器的关键技术。

```js
// 工厂函数，返回一个类
function createClassWithGreeting(greeting) {
  // 动态创建类-----------
  return class {
    constructor(name) {
      this.name = name;
    }
    
    greet() {
      console.log(`${greeting}, ${this.name}!`);
    }
  };
}

// 在运行时创建类
const EnglishGreeting = createClassWithGreeting("Hello");
const SpanishGreeting = createClassWithGreeting("Hola");

const englishInstance = new EnglishGreeting("Alice");
const spanishInstance = new SpanishGreeting("Bob");

englishInstance.greet(); // 输出: "Hello, Alice!"
spanishInstance.greet(); // 输出: "Hola, Bob!"
```


好处：
- 非侵入式修改类，不直接修改原始类的定义，通过继承添加新功能，保持原始类的纯净
- 支持装饰器组合，多个装饰器可以依次应用，每个装饰器都可以继承并拓展前一个装饰器的结果


33. sse ai
1）客户端连接上sse，监听msg + new ai实例连接配置
2）用户在客户端输入框，输入相关问题，发送，执行


34. SSE 读写分离接口设计范式详解
- 1）核心设计理念
  - 读写分离原则：
    - 写操作，通过 POST 请求提交数据和指令
    - 读操作：通过 SSE 通道接收服务器推送的实时数据
  - 异步处理模式
    - 客户端通过 POST 触发服务器端的长时间运行任务
    - 服务器通过 SSE 实时推送任务进度或结果
    - 客户端无需轮询，降低服务器压力
- 2）典型使用场景
  - AI 模型流式响应：客户端提交文本 prompt，服务器调用 AI 模型并通过 SSE 推送生成的文本流
  - 大数据处理任务：提交批量数据处理请求，实时接收处理进度和结果
  - 实时监控系统：客户端订阅监控指标，服务器持续推送系统状态变化
  - 通知系统：客户端建立持久连接，服务器推送新消息、提醒等
- 3）接口设计
  - POST /tasks：创建新任务，返回任务 ID
  - GET /tasks/{taskId}/events：订阅任务事件流
    - 服务器端实现 SSE 通道，保持连接，有新数据时推送
    - 客户端监听事件，处理实时数据
- 4）注意事项
  - 任务状态管理：服务器端维护任务状态，处理失败重试
  - 数据传输格式：SSE 事件流，JSON 或文本格式
  - 认证与授权：保护任务创建和订阅接口，防止恶意请求



35. 解释lastEventId
```ts
  getStream(
    lastEventId?: string,
  ): { stream: ReadableStream; controller: ReadableStreamDefaultController | null; } {
    let controller: ReadableStreamDefaultController | null = null;
    const stream = new ReadableStream({
      start(_controller: ReadableStreamDefaultController) {
        controller = _controller;
      },
    });

    const events = this.eventBuffer;

    let i = 0;
    let isFinished = false;

    if (lastEventId) {
      for( let j = 0; j < events.length; j++) {
        const event = events[j];
        if (event.startsWith('data: {"event":"finished"}')) {
          isFinished = true;
          break;
        }
        // 遍历事件缓冲区，查找包含 lastEventId 的事件
        // 找到后，从下一个事件开始继续推送
        if (event.includes(`id: ${lastEventId}`)) {
          i = j + 1; // 将起始发送位置设为 下一个事件
          break; // break 终止循环，开始从 i 位置发送剩余事件
        }
      }
    }

    for(; i < events.length; i++) {
      const event = events[i];
      if (event.startsWith('data: {"event":"finished"}')) {
        isFinished = true;
        break;
      }
      if (controller) {
        (controller as ReadableStreamDefaultController).enqueue(event);
      }
    }


    (async () => {
      // 等待更新
      while (true) {
        if (isFinished) {
          break;
        }
        await sleep(this.frequency);
        for (; i < events.length; i++) {
          const event = events[i];
          if (event.startsWith('data: {"event":"finished"}')) {
            isFinished = true;
          }
          if (controller) {
            (controller as ReadableStreamDefaultController).enqueue(event);
          }
        }
      }
      // console.log(events);
      this.eventBuffer = [];
      if (controller) {
        (controller as ReadableStreamDefaultController).close();
      }
      delete EventChannelMap[this.id];
    })();

    return { stream, controller }
  }
```


`event.includes(`id: ${lastEventId}`)`event为什么不是最后一个？
- lastEventId 的含义：表示客户端 最后成功接收的事件 ID，而不是最新事件的 ID
- 断点续传的目标：从客户端 中断的位置 继续发送，而不是从最新事件开始


lastEventId 参数实现了 断点续传 机制，允许客户端在连接中断后恢复数据流。这是处理长连接和实时数据流的常见需求，特别是在 SSE（Server-Sent Events）场景中。
- 核心作用
  - 标识最后接收的事件
    - lastEventId 是客户端最后成功接收的事件 ID
    - 用于告诉服务器从哪个事件开始继续推送数据
  - 断点续传
    - 当客户端连接中断后，重新连接时携带 lastEventId
    - 服务器根据这个 ID 定位断点位置，继续推送未接收的事件



SSE 的自动机制：
- 浏览器会自动重连并携带 Last-Event-ID
- 服务器需要正确处理这个头信息


```ts
// 客户端示例
const eventSource = new EventSource('/stream');
let lastEventId = '';

eventSource.onmessage = (event) => {
  lastEventId = event.lastEventId;
  // 处理事件
};

eventSource.onerror = () => {
  // 重新连接时携带lastEventId
  eventSource.close();
  eventSource = new EventSource(`/stream?lastEventId=${lastEventId}`);
};
```

断点续传的手动实现 vs 自动机制
- SSE 自动机制的局限性
  - 仅适用于连接短暂中断：如果服务器重启或事件缓冲区已清空，自动机制失效
  - 依赖事件 ID 的连续性：如果事件 ID 不连续（如使用 UUID），自动机制可能无法正确定位
- 代码中的手动增强
  - 事件缓冲区：存储历史事件，允许在服务器重启后仍能续传
  - 自定义 ID 匹配逻辑：不依赖浏览器自动机制，支持更灵活的 ID 格式
  - 完整状态管理：通过 finished 事件明确标识流结束，避免客户端无限等待







raft-admin-server  | wait-for-it.sh: timeout occurred after waiting 15 seconds for ${DB_HOST}:${DB_PORT}
raft-admin-server  | 
raft-admin-server  | > raft-admin@0.0.1 migration:run
raft-admin-server  | > npm run typeorm -- migration:run
raft-admin-server  | 
raft-admin-server  | 
raft-admin-server  | > raft-admin@0.0.1 typeorm
raft-admin-server  | > NODE_ENV=development typeorm-ts-node-esm -d ./dist/config/database.config.js migration:run
raft-admin-server  | 
raft-admin-server  | Error during migration run:
raft-admin-server  | Error: Unable to open file: "/raft-admin/dist/config/database.config.js". Cannot read properties of undefined (reading 'isPrimary')
raft-admin-server  |     at CommandUtils.loadDataSource (/raft-admin/node_modules/typeorm/commands/CommandUtils.js:21:19)
raft-admin-server  |     at async Object.handler (/raft-admin/node_modules/typeorm/commands/MigrationRunCommand.js:40:26)
raft-admin-server exited with code 0


ENTRYPOINT ["./wait-for-it.sh", "${DB_HOST}:${DB_PORT}", "--", "sh", "-c", "npm run migration:run && pm2-runtime ecosystem.config.js"]






"@liaoliaots/nestjs-redis": "^10.0.0",

npm audit fix --force