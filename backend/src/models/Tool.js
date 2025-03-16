const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '请提供工具标题'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, '请提供工具描述'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, '请提供工具图标'],
    },
    url: {
      type: String,
      required: [true, '请提供工具链接'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, '请提供工具分类'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tool', ToolSchema); 