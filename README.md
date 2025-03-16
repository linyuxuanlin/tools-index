# 工具导航

这是一个简单的工具导航网站，用于展示和收藏各种实用的在线工具。

## 功能特点

- 以卡片形式展示多种在线工具
- 支持用户注册和登录
- 登录用户可以收藏工具，方便快速访问
- 响应式设计，适配各种设备
- 现代简约拟物风格UI

## 技术栈

- 前端：React, TypeScript, Tailwind CSS
- 后端：Node.js, Express.js
- 数据库：MongoDB
- 认证：JWT
- 部署：Docker, Nginx

## 本地开发

### 前端开发

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 后端开发

```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 导入初始数据
npm run data:import

# 启动开发服务器
npm run dev
```

## Docker部署

使用Docker Compose一键部署整个应用：

```bash
# 构建并启动所有服务
docker-compose up -d

# 访问应用
# 前往浏览器访问 http://localhost:8080
```

## 项目结构

```
tools-index/
├── frontend/              # 前端React应用
│   ├── public/            # 静态资源
│   │   └── favicon.svg
│   ├── src/               # 源代码
│   │   ├── api/           # API请求
│   │   ├── components/    # React组件
│   │   ├── pages/         # 页面组件
│   │   ├── types/         # TypeScript类型定义
│   │   └── ...
│   └── ...
├── backend/               # 后端Express应用
│   ├── src/               # 源代码
│   │   ├── config/        # 配置文件
│   │   ├── controllers/   # 控制器
│   │   ├── data/          # 初始数据
│   │   ├── middleware/    # 中间件
│   │   ├── models/        # MongoDB模型
│   │   ├── routes/        # API路由
│   │   └── ...
│   └── ...
├── nginx/                 # Nginx配置
│   └── default.conf
└── compose.yml            # Docker Compose配置
```

## 许可证

MIT 