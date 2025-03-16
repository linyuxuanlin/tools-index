const express = require('express');
const router = express.Router();
const {
  getTools,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/toolsController');
const { protect } = require('../middleware/auth');

// 获取所有工具
router.get('/', getTools);

// 获取收藏的工具
router.get('/favorites', protect, getFavorites);

// 添加工具到收藏
router.post('/favorites/:id', protect, addFavorite);

// 从收藏中移除工具
router.delete('/favorites/:id', protect, removeFavorite);

module.exports = router; 