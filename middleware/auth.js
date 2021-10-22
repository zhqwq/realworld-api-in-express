const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model/index')

// auth中间件可以校验token是否有效，如果有效，会把用户信息挂载到request上
module.exports = async (req, res, next) => {
  // 1. 从 header 中获取 Authorization 字段中的 Token 数据
  let token = req.headers.authorization
  token = token 
    ? token.split('Bearer ')[1] 
    : null

  // 若token不存在，返回 401 Unauthorized 响应码 
  if(!token){
    return res.status(401).end()
  }
  
  try {
    // 2. 验证 token 是否有效
    const decoded = await verify(token, jwtSecret)
    
    // 若token有效，把用户信息挂载到 req 请求对象上,继续往后执行
    req.user = await User.findById(decoded.userID)
    next()
  } catch (error) {
    // 若token无效，响应 401 Unauthorized 状态码
    return res.status(401).end()
  }
}