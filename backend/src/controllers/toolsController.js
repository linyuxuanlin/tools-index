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
    console.log('添加收藏请求:', { userId: req.user._id, toolId });

    // 验证工具ID
    if (!toolId || toolId === 'undefined') {
      console.error('无效的工具ID:', toolId);
      return res.status(400).json({
        success: false,
        message: '无效的工具ID',
      });
    }

    // 检查工具是否存在
    const tool = await Tool.findById(toolId);
    if (!tool) {
      console.error('工具不存在:', toolId);
      return res.status(404).json({
        success: false,
        message: '工具不存在',
      });
    }

    // 检查是否已经收藏
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error('用户不存在:', req.user._id);
      return res.status(404).json({
        success: false,
        message: '用户不存在',
      });
    }

    if (user.favorites.includes(toolId)) {
      console.log('工具已在收藏中:', toolId);
      return res.status(400).json({
        success: false,
        message: '该工具已在收藏中',
      });
    }

    // 添加到收藏
    user.favorites.push(toolId);
    await user.save();
    console.log('收藏成功:', { userId: user._id, toolId });

    res.json({
      success: true,
      message: '工具已添加到收藏',
    });
  } catch (error) {
    console.error('添加收藏失败:', error);
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
    console.log('移除收藏请求:', { userId: req.user._id, toolId });

    // 验证工具ID
    if (!toolId || toolId === 'undefined') {
      console.error('无效的工具ID:', toolId);
      return res.status(400).json({
        success: false,
        message: '无效的工具ID',
      });
    }

    // 检查用户
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error('用户不存在:', req.user._id);
      return res.status(404).json({
        success: false,
        message: '用户不存在',
      });
    }

    // 检查是否已收藏
    if (!user.favorites.includes(toolId)) {
      console.log('收藏中不存在该工具:', toolId);
      return res.status(400).json({
        success: false,
        message: '收藏中不存在该工具',
      });
    }

    // 从收藏中移除
    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== toolId
    );
    await user.save();
    console.log('取消收藏成功:', { userId: user._id, toolId });

    res.json({
      success: true,
      message: '工具已从收藏中移除',
    });
  } catch (error) {
    console.error('移除收藏失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message,
    });
  }
}; 