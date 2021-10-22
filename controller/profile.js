// profile 有关的处理函数

// 获取用户资料
exports.getProfile = async (req, res, next) => {
  try {
    res.send('get /profiles/:username')
  } catch (err) {
    next(err)
  }
}

// 关注用户
exports.followUser = async (req, res, next) => {
  try {
    res.send('post /profiles/:username/follow')
  } catch (err) {
    next(err)
  }
}

// 取消关注
exports.unfollowUser = async (req, res, next) => {
  try {
    res.send('delete /profiles/:username/follow')
  } catch (err) {
    next(err)
  }
}
