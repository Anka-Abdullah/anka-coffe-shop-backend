const router = require('express').Router()
const { authorization, access } = require('../midleware/auth')
const {
  getHistory,
  getHistoryDetail,
  postHistory
} = require('../controller/history')

router.get('/', authorization, getHistory)
router.get('/detail', access, getHistoryDetail)
router.post('/', authorization, postHistory)

module.exports = router
