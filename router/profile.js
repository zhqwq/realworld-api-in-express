const express = require('express')
const profileCtrl = require('../controller/profile')
const router = express.Router()

router.get('/:username', profileCtrl.getProfile)
router.post('/:username/follow', profileCtrl.followUser)
router.delete('/:username/follow', profileCtrl.unfollowUser)

module.exports = router
