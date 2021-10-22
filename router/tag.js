const express = require('express')

const router = express.Router()

// Get tags
router.get('/', async (req, res, next) => {
  try {
    res.send('GET /api/tags')
  } catch (err) {
    next(err)
  }
})

module.exports = router
