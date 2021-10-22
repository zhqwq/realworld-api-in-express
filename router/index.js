const express = require('express')
const router = express.Router()

// index.js 通常用于组织相同的文件，这里用于组织路由

// 用户相关路由
router.use(require('./user'))

// 用户资料相关路由
router.use('/profiles', require('./profile'))

// 文章相关路由
router.use('/articles', require('./article'))

router.use('/tags', require('./tag'))

module.exports = router
