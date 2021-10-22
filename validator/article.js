const validate = require('../middleware/validate')
const { body, param } = require('express-validator')
const mongoose = require('mongoose')
const { Article } = require('../model/index')

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('文章标题不能为空'),
  body('article.description').notEmpty().withMessage('文章描述不能为空'),
  body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = validate([
  param('slug').custom(async value => {
    if(!mongoose.isValidObjectId(value)) {
      return Promise.reject('不是一个有效的文章ID')
    }
  })
])

// validator也是中间件的一种
exports.updateArticle = [
  // 检验是否是有效的ObjectId
  validate([
    validate.isValidObjectId(['params'], 'slug'),
  ]),
  // 检验文章是否存在
  async (req, res, next) => {
    const slug = req.params.slug
    const article = await Article.findById(slug)
    req.article = article
    if(!article) {
      return res.status(404).end()
    }
    next()
  },
  // 修改的文章作者是否为当前登录用户
  async (req, res, next) => {
    if(req.user._id.toString() !== req.article.author){
      return res.status(403).end()
    }
    next()
  }
]

exports.deleteArticle = exports.updateArticle