module.exports = () => {
  // (err, req, res, next) => void express中间件的错误处理函数
  return (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}
