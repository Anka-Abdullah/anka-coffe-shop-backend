const router = require('Express').Router()
const { getHistoryRedis, clearHistoryRedis } = require('../midleware/redis')
const { authorization } = require('../midleware/auth')
const { getHistory, postHistory } = require('../controller/history')

router.get('/', authorization, getHistoryRedis, getHistory)
router.post('/', authorization, clearHistoryRedis, postHistory)

module.exports = router
