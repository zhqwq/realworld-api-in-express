const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/user') // user controller
const userValidator = require('../validator/user') // validator 中间件
const auth = require('../middleware/auth') // token authorization 中间件

// 用户登录
router.post('/users/login', userValidator.login, userCtrl.signin)

// 用户注册
router.post( '/users', userValidator.register, userCtrl.register)

// 获取当前用户
router.get('/user', auth, userCtrl.getCurrentUser)

// 更新当前用户
router.put('/user', auth, userCtrl.updateCurrentUser)

module.exports = router
