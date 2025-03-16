const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/tools-index');
    console.log(`MongoDB连接成功: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB连接失败: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 