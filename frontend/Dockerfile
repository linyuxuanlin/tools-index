FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源码
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# 设置启动命令
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 