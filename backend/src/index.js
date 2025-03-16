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

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/tools-index')
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolsRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
}); 