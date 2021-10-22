const mongoose = require('mongoose')
const { dbUri } = require('../config/config.default')

// 连接到mongoDB的test数据库
mongoose.connect(dbUri)

const db = mongoose.connection

db.on('error', err => {
  console.log('MongoDB 数据库连接失败', err)
})

db.once('open', () => {
  console.log('MongoDB 数据库连接成功')
})

// 统一导出模型类
module.exports = {
  User: mongoose.model('User', require('./user.js')), // 使用Schema创建Model
  Article: mongoose.model('Article', require('./article.js'))
}
