const mongoose = require('mongoose');
const { exec } = require('child_process');
const Tool = require('./models/Tool');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/tools-index';

// 函数：尝试连接MongoDB
const connectWithRetry = async () => {
  console.log('尝试连接MongoDB...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB连接成功');
    return true;
  } catch (err) {
    console.error('MongoDB连接失败，将在5秒后重试', err.message);
    return false;
  }
};

// 函数：检查是否需要导入数据
const checkAndImportData = async () => {
  try {
    const count = await Tool.countDocuments();
    
    if (count === 0) {
      console.log('没有工具数据，开始导入初始数据...');
      
      // 使用child_process执行数据导入脚本
      exec('node src/seeder.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`数据导入失败: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`数据导入警告: ${stderr}`);
          return;
        }
        console.log(`数据导入成功: ${stdout}`);
      });
    } else {
      console.log(`已有${count}个工具数据，跳过导入`);
    }
  } catch (err) {
    console.error('检查数据失败:', err.message);
  }
};

// 函数：启动应用
const startApp = () => {
  console.log('启动应用...');
  require('./index');
};

// 主函数
const main = async () => {
  let connected = false;
  
  // 尝试连接，最多重试10次
  for (let i = 0; i < 10 && !connected; i++) {
    connected = await connectWithRetry();
    
    if (!connected) {
      // 等待5秒再次尝试
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  if (connected) {
    await checkAndImportData();
    startApp();
  } else {
    console.error('无法连接到MongoDB，应用启动失败');
    process.exit(1);
  }
};

// 执行主函数
main(); 