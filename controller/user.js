const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// 用户登录
exports.signin = async (req, res, next) => {
  try {
    // 1. 获取user数据
    const user = req.user.toJSON()

    // 2. 生成Token
    const token = await jwt.sign(
      {
        userID: user._id 
      }, 
      jwtSecret,
      { expiresIn: '1d' }
    )

    // 3. 发送成功响应(包含代表用户信息的token)
    res.status(200).json({
      ...user,
      token
    })
  } catch (err) {
    next(err)
  }
}

// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 1. 获取请求体数据
    console.log(req.body)

    // 2. 数据验证（使用express-validator中间件）

    // 3. 将数据保存到数据库
    const user = new User(req.body.user) // 使用Model创建文档
    await user.save()

    // 4. 发送成功响应
    res.status(201).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('put /users')
  } catch (err) {
    next(err)
  }
}
