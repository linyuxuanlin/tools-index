const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// 导入模型
const Tool = require('./models/Tool');

// 导入数据
const tools = require('./data/tools');

// 加载环境变量
dotenv.config();

// 连接数据库
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/tools-index');

// 导入数据
const importData = async () => {
  try {
    // 清空数据库
    await Tool.deleteMany();

    // 导入工具数据
    await Tool.insertMany(tools);

    console.log('数据导入成功'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// 删除数据
const destroyData = async () => {
  try {
    // 清空数据库
    await Tool.deleteMany();

    console.log('数据删除成功'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// 根据命令行参数执行操作
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 