const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value), // 从Model层面上，set password进行md5处理
    select: false // 查询时不返回password字段
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  ...baseModel
})

module.exports = userSchema
