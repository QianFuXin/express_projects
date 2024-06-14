# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-slim

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖 --registry=https://registry.npmmirror.com/ 可选
RUN npm install --production

# 将应用的源代码复制到工作目录
COPY . .

# 暴露应用运行的端口
EXPOSE 3000

# 定义启动命令
CMD ["npm", "run", "start"]
