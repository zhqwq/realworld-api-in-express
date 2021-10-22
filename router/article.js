const express = require('express')
const articleCtrl = require('../controller/article')
const router = express.Router()
const auth = require('../middleware/auth')
const articleValidator = require('../validator/article')

// 获取所有文章
router.get('/', articleCtrl.getArticles)

// Feed Articles
router.get('/feed', articleCtrl.feedArticles)

// 获取文章
router.get('/:slug', articleValidator.getArticle, articleCtrl.getArticle)

// 创建文章(需要验证)
router.post('/', auth, articleValidator.createArticle, articleCtrl.createArticle)

// 更新文章
router.put('/:slug', auth, articleValidator.updateArticle, articleCtrl.updateArticle)

// 删除文章
router.delete('/:slug', auth, articleValidator.deleteArticle, articleCtrl.deleteArticle)

// 添加评论
router.post('/:slug/comments', articleCtrl.commentArticle)

// 获取评论
router.get('/:slug/comments', articleCtrl.getComments)

// 删除评论
router.delete('/:slug/comments/:id', articleCtrl.deleteComment)

// 收藏文章
router.post('/:slug/favorite', articleCtrl.likeArticle)

// 取消收藏
router.delete('/:slug/favorite', articleCtrl.unlikeArticle)

module.exports = router
