const Tool = require('../models/Tool');
const User = require('../models/User');

// @desc    获取所有工具
// @route   GET /api/tools
// @access  Public
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find().sort({ title: 1 });

    res.json({
      success: true,
      count: tools.length,
      tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message,
    });
  }
};

// @desc    获取用户收藏的工具
// @route   GET /api/tools/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');

    res.json({
      success: true,
      count: user.favorites.length,
      tools: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message,
    });
  }
};

// @desc    添加工具到收藏
// @route   POST /api/tools/favorites/:id
// @access  Private
exports.addFavorite = async (req, res) => {
  try {
    const toolId = req.params.id;

    // 检查工具是否存在
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: '工具不存在',
      });
    }

    // 检查是否已经收藏
    const user = await User.findById(req.user._id);
    if (user.favorites.includes(toolId)) {
      return res.status(400).json({
        success: false,
        message: '该工具已在收藏中',
      });
    }

    // 添加到收藏
    user.favorites.push(toolId);
    await user.save();

    res.json({
      success: true,
      message: '工具已添加到收藏',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message,
    });
  }
};

// @desc    从收藏中移除工具
// @route   DELETE /api/tools/favorites/:id
// @access  Private
exports.removeFavorite = async (req, res) => {
  try {
    const toolId = req.params.id;

    // 从收藏中移除
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== toolId
    );
    await user.save();

    res.json({
      success: true,
      message: '工具已从收藏中移除',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message,
    });
  }
}; 