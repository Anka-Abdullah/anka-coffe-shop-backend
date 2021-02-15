const router = require('express').Router()
const { authorization, access } = require('../midleware/auth')
const {
  getHistory,
  getHistoryDashboard,
  getHistoryChart,
  getHistoryId,
  postHistory,
  postInvoice
} = require('../controller/history')

router.get('/', authorization, getHistory)
router.get('/dashboard', authorization, access, getHistoryDashboard)
router.get('/chart', authorization, access, getHistoryChart)
router.post('/id', authorization, getHistoryId)
router.post('/invoice', authorization, postInvoice)
router.patch('/:id', authorization, postHistory)

module.exports = router
