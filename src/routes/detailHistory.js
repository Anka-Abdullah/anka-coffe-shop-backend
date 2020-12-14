const router = require('Express').Router()

const {
  getDetailHistory,
  getDetailHistoryById,
  postDetailHistory,
  deleteDetailHistory
} = require('../controller/detailHistory')

router.get('/', getDetailHistory)
router.get('/:id', getDetailHistoryById)
router.post('/', postDetailHistory)
router.delete('/:id', deleteDetailHistory)

module.exports = router
