FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装Node依赖
COPY package*.json ./
RUN npm install

# 复制源码
COPY . .

# 设置环境变量
ENV NODE_ENV=production

# 设置启动命令
CMD ["node", "src/startScript.js"] 