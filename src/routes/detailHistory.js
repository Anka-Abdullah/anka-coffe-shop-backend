const router = require('Express').Router()
const {
  getDetailHistoryRedis,
  clearDetailHistoryRedis
} = require('../midleware/redis')
const {
  getDetailHistory,
  getDetailHistoryById,
  postDetailHistory,
  deleteDetailHistory
} = require('../controller/detailHistory')

router.get('/', getDetailHistoryRedis, getDetailHistory)
router.get('/:id', getDetailHistoryById)
router.post('/', clearDetailHistoryRedis, postDetailHistory)
router.delete('/:id', clearDetailHistoryRedis, deleteDetailHistory)

module.exports = router
