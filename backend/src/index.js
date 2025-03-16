const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// 导入路由
const authRoutes = require('./routes/auth');
const toolsRoutes = require('./routes/tools');

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// MongoDB连接选项
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// 连接MongoDB
const connectMongoDB = async () => {
  try {
    console.log('尝试连接MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/tools-index', mongoOptions);
    console.log('MongoDB连接成功');
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    console.log('10秒后重试连接...');
    setTimeout(connectMongoDB, 10000);
  }
};

connectMongoDB();

// 断线重连
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB断开连接，尝试重新连接...');
  setTimeout(connectMongoDB, 5000);
});

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolsRoutes);

// 添加健康检查端点
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    db: dbStatus
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
}); 