const router = require('Express').Router()
const { getHistoryRedis, clearHistoryRedis } = require('../midleware/redis')
const { authorization } = require('../midleware/auth')

const {
  getHistory,
  getHistoryById,
  postHistory,
  deleteHistory
} = require('../controller/history')

router.get('/', authorization, getHistoryRedis, getHistory)
router.get('/:id', authorization, clearHistoryRedis, getHistoryById)
router.post('/', authorization, clearHistoryRedis, postHistory)
router.delete('/:id', authorization, clearHistoryRedis, deleteHistory)

module.exports = router
