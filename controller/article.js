const { Article, User } = require('../model/index')

// 获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    const { 
        limit = 20, 
        offset = 0,
        tag,
        author 
      } = req.query

    const filter = {}

    if (tag) {
      filter.tagList = tag
    }

    if (author) {
      const user = await User.findOne({ username: author })
      filter.author = user ? user._id : null
    }

    const articlesCount = await Article.countDocuments()
    const articles = await Article
      .find(filter)
      .skip(Number.parseInt(offset)) // 跳过多少条
      .limit(Number.parseInt(limit)) // 取多少条
      .sort({
        createdAt: -1 // descending
      })
    
    res.status(200).json({
      articles,
      articlesCount
    })
  } catch (err) {
    next(err)
  }
}

exports.feedArticles = async (req, res, next) => {
  try {
    res.send('get /articles/feed')
  } catch (err) {
    next(err)
  }
}

// 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.slug)
    await article.populate('author')
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article)
    article.author = req.user._id
    article.populate('author') // author: userID => user
    await article.save()
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

// 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.body = bodyArticle.body || article.body
    await article.save()
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

// 刪除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article
    await article.remove()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

exports.commentArticle = async (req, res, next) => {
  try {
    res.send('POST /api/articles/:slug/comments')
  } catch (err) {
    next(err)
  }
}

exports.getComments = async (req, res, next) => {
  try {
    res.send('GET /api/articles/:slug/comments')
  } catch (err) {
    next(err)
  }
}

exports.deleteComment = async (req, res, next) => {
  try {
    res.send('DELETE /api/articles/:slug/comments/:id')
  } catch (err) {
    next(err)
  }
}

exports.likeArticle = async (req, res, next) => {
  try {
    res.send('POST /api/articles/:slug/favorite')
  } catch (err) {
    next(err)
  }
}

exports.unlikeArticle = async (req, res, next) => {
  try {
    res.send('DELETE /api/articles/:slug/favorite')
  } catch (err) {
    next(err)
  }
}

