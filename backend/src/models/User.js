const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, '请提供邮箱'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, '请提供有效的邮箱地址'],
    },
    password: {
      type: String,
      required: [true, '请提供密码'],
      minlength: [6, '密码至少需要6个字符'],
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 保存前加密密码
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 验证密码方法
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 