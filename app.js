const express = require('express')
const morgan = require('morgan') // request logger
const cors = require('cors') // add res header Access-Control-Allow-Origin:*

const router = require('./router')
const errorHandler = require('./middleware/error-handler')
const app = express()

require('./model') // 连接 MongoDB 数据库服务器

// 使用中间件
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// 挂载路由
app.use('/api', router)

// 挂载错误处理中间件
// errorHandler() 是一个函数，可以向函数传递参数，返回一个错误处理中间件
app.use(errorHandler())

// 监听端口
const PORT = 4000
app.listen(PORT, () => {
  console.log(`Express 服务器正在监听 http://localhost:${PORT}`)
})
