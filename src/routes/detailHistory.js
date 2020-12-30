const router = require('express').Router()
const { authorization } = require('../midleware/auth')
const {
  getDetailHistory,
  postDetailHistory,
  deleteDetailHistory
} = require('../controller/detailHistory')

router.get('/', authorization, getDetailHistory)
router.post('/', authorization, postDetailHistory)
router.delete('/:id', authorization, deleteDetailHistory)

module.exports = router
