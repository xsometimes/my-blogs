

## 基础知识
1. 两个yml

| **配置项**               | **开发环境 (`docker-compose.yml`)**                     | **生产环境 (`docker-compose.prod.yml`)**               |
|--------------------------|----------------------------------------------------------|--------------------------------------------------------|
| **构建方式**             | 使用本地代码构建 (`build: .`)                           | 拉取预构建镜像 (`image: registry.example.com/app`)   |
| **端口映射**             | 暴露容器端口到宿主机（如 `3000:3000`）                  | 通常不直接映射，通过反向代理（如 Nginx）访问         |
| **数据卷挂载**           | 挂载本地代码目录（支持实时更新）                        | 仅挂载必要的数据卷（如数据库存储）                    |
| **环境变量**             | 使用开发配置（如 `NODE_ENV=development`）               | 使用生产配置（如 `NODE_ENV=production`）              |
| **服务重启策略**         | `no` 或 `on-failure`                                      | `always` 或 `unless-stopped`                          |
| **日志配置**             | 控制台输出（方便查看）                                   | 输出到文件或日志服务（如 ELK Stack）                  |
| **服务数量**             | 可能包含开发工具（如数据库管理界面）                     | 仅包含应用运行必需的服务                               |
| **命令**             | npm run docker:build:dev  # 对应命令：docker compose up --build | npm run docker:prod:up  # 对应命令：docker compose -f docker-compose.prod.yml up -d |

2. 开发环境、生产环境 构建部署运行，还有docker hub的关系

|阶段 |	操作命令 |	与 Docker Hub 的关系 |
|-----|-----------|----------------------|
|开发环境构建 |	npm run docker:build:dev |	本地构建镜像，不涉及 Docker Hub |
|测试 / 预发布 |	手动构建并推送镜像 |	docker push 将镜像上传到 Docker Hub |
|生产环境部署 |	npm run docker:prod:up |	从 Docker Hub 拉取镜像并启动容器 |


3. 和Dockerfile的关系
- Dockerfile：镜像构建，包含基础镜像、依赖安装、代码复制、命令执行等步骤
- Docker Compose：容器编排，配置运行参数，定义多个容器（如应用、数据库、缓存）如何协同工作。

4. 目前的项目
- `wait-for-it.sh`：可以让应用容器等待依赖服务就绪后再继续执行后续操作。（在容器化应用部署中，很多时候应用会依赖其他服务，比如数据库、消息队列等。然而，容器的启动是并行的，这就可能出现应用容器已经启动，但它所依赖的服务（如数据库容器）还未完全启动并准备好接受连接的情况。在这种情况下，应用尝试连接依赖服务就会失败）。
- `npm run typeorm -- migration:run`: TypeORM 框架提供的数据库迁移命令
   - 数据库迁移（Migration）是一种 版本控制数据库结构 的方式，类似于 Git 管理代码。每个迁移文件记录了对数据库的修改（如创建表、添加字段），并按顺序执行
   - migration:run 命令的作用：自动执行未执行的迁移，TypeORM 会检查 migrations 目录中的脚本，比对数据库中已执行的记录（通常存储在 migrations 表中），只执行尚未应用的迁移。

- database config文件里，指定迁移路径

```ts
const dataSourceOptions: DataSourceOptions = {
  ...,
  migrations: ['dist/migrations/*{.ts,.js}'], // 指定 TypeORM 要加载的数据库迁移文件路径。迁移文件用于管理数据库表结构的变更。
} 
```


5. 清除当前目录下所有的docker容器
```bash

docker builder prune # 清除构建缓存（保留基础镜像）

docker compose down # 停止并删除所有容器

docker rmi raft-admin-server # 删除Docker镜像

docker system prune -f # 清理Docker系统

docker volume prune -f # 删除数据卷(如果需要完全重置数据库)



docker builder du  # 如果只想清除特定的缓存层，可以先查看缓存：


docker compose build --no-cache && docker compose up # 如果只是想重新构建而不清理所有内容，可以直接运行


# 查看单个容器的网络模式
docker inspect <容器ID或名称> | grep NetworkMode
``` 


4. docker拉取时间过长的一些优化
- 换国内快一点的镜像源，有些需要付费的阿里、腾讯镜像源，免费的可能会一段时间后用不了
- 分阶段构建，有些基础（编译工具、测试依赖）构建成功后的 下次就无需再构建了，如node
- 指定node版本，不要用latest等
- 用轻量版本，如slim等


5. docker运行的一些命令

```bash
# 启动MySql服务：准备好配置参数，启动mysql服务，让它安静地在后台运行，同时把需要的端口都开放出来
# docker compose ：调用Docker Compose工具
# --env-file .env --env-file .env.development ：加载两个环境变量文件
# run ：启动服务容器
# -d ：后台运行(daemon模式)
# --service-ports ：
#   - 暴露服务定义的所有端口
#   - 相当于把docker-compose.yml里ports配置的端口都映射出来
# mysql ：指定要运行的服务名称
docker compose --env-file .env --env-file .env.development run -d --service-ports mysql

# 备好配置参数，重新构建所有服务的镜像，启动所有服务
# up：启动所有服务， docker-compose.yml 定义的所有服务） = run mysql + run redis + pnpm dev（项目服务）
# down：停止并移除所有容器。默认会保留数据卷(volume)，相当于执行了 stop + rm 两个操作
# --build ：强制重新构建镜像，即使镜像已经存在也会重新构建
# （但是docker有构建缓存机制，如果dockerfile和构建上下文没变化，会复用之前的的镜像）
docker compose --env-file .env --env-file .env.development up --build


```









docker exec -it 81282ce3d241 ls -la /raft-admin/dist/config/



5. docker-compose文件中的两句命令

配置了MySQL容器的两个重要数据卷挂载
```yml
mysql
  volumes:
      - ./__data/mysql/:/var/lib/mysql/ # ./__data/mysql/ 路径可以替换成自己的路径
      - ./deploy/sql/:/docker-entrypoint-initdb.d/ # 初始化的脚本，若 ./__data/mysql/ 文件夹存在数据，则不会执行初始化脚本
```