const router = require('Express').Router()
const { authorization } = require('../midleware/auth')

const {
  getHistory,
  getHistoryById,
  postHistory,
  deleteHistory
} = require('../controller/history')

router.get('/', authorization, getHistory)
router.get('/:id', authorization, getHistoryById)
router.post('/', authorization, postHistory)
router.delete('/:id', authorization, deleteHistory)

module.exports = router
