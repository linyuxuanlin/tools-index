FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源码
COPY . .

# 创建启动脚本
RUN echo '#!/bin/sh\nnode_modules/.bin/vite --host 0.0.0.0' > start.sh && \
    chmod +x start.sh

# 设置环境变量
ENV NODE_ENV=production

# 设置启动命令
CMD ["./start.sh"] 