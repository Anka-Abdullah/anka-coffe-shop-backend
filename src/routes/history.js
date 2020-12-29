const router = require('Express').Router()
const {
  getHistoryRedis,
  getHistoryDetailRedis,
  clearHistoryRedis
} = require('../midleware/redis')
const { authorization, access } = require('../midleware/auth')
const {
  getHistory,
  getHistoryDetail,
  postHistory
} = require('../controller/history')

router.get('/', authorization, getHistoryRedis, getHistory)
router.get('/detail', access, getHistoryDetailRedis, getHistoryDetail)
router.post('/', authorization, clearHistoryRedis, postHistory)

module.exports = router
