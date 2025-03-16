const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 生成JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'tools_index_secret', {
    expiresIn: '30d',
  });
};

// @desc    注册用户
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log('注册请求数据:', req.body);
    const { name, email, password } = req.body;

    // 基本验证
    if (!email || !password) {
      console.log('注册失败：邮箱或密码为空');
      return res.status(400).json({
        success: false,
        message: '请提供邮箱和密码',
      });
    }

    // 检查用户是否已存在
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('注册失败：邮箱已被注册', email);
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册',
      });
    }

    // 创建用户
    console.log('创建用户:', { name, email });
    const user = await User.create({
      name: name || '',
      email,
      password,
      favorites: [],
    });

    // 生成token
    const token = generateToken(user._id);

    // 返回响应
    console.log('用户创建成功:', user._id);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    console.error('注册错误详情:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，注册失败',
      error: error.message,
    });
  }
};

// @desc    用户登录
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('登录请求数据:', req.body);
    const { email, password } = req.body;

    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      console.log('登录失败：用户不存在', email);
      return res.status(401).json({
        success: false,
        message: '邮箱或密码不正确',
      });
    }

    // 检查密码是否匹配
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('登录失败：密码不匹配', email);
      return res.status(401).json({
        success: false,
        message: '邮箱或密码不正确',
      });
    }

    // 生成token
    const token = generateToken(user._id);

    console.log('登录成功:', user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    console.error('登录错误详情:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，登录失败',
      error: error.message,
    });
  }
};

// @desc    获取当前用户信息
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    console.log('获取用户信息:', req.user._id);
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log('获取用户信息失败：用户不存在', req.user._id);
      return res.status(404).json({
        success: false,
        message: '用户不存在',
      });
    }

    console.log('获取用户信息成功:', user._id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    console.error('获取用户信息错误详情:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，获取用户信息失败',
      error: error.message,
    });
  }
}; 