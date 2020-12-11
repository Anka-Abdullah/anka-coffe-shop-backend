const router = require('Express').Router()

const {
  getHistory,
  getHistoryById,
  postHistory,
  patchHistory,
  deleteHistory
} = require('../controller/history')

router.get('/', getHistory)
router.get('/:id', getHistoryById)
router.post('/', postHistory)
router.patch('/:id', patchHistory)
router.delete('/:id', deleteHistory)

module.exports = router
