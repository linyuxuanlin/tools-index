const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// 注册路由
router.post('/register', register);

// 登录路由
router.post('/login', login);

// 获取当前用户信息
router.get('/me', protect, getMe);

module.exports = router; 