const router = require('Express').Router()

const {
  getHistory,
  getHistoryById,
  postHistory,
  deleteHistory
} = require('../controller/history')

router.get('/', getHistory)
router.get('/:id', getHistoryById)
router.post('/', postHistory)
router.delete('/:id', deleteHistory)

module.exports = router
