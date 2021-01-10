const router = require('express').Router()
const { authorization, access } = require('../midleware/auth')
const {
  getHistory,
  getHistoryDashboard,
  getHistoryChart,
  postHistory,
  postInvoice
} = require('../controller/history')

router.get('/', authorization, getHistory)
router.get('/dashboard', authorization, access, getHistoryDashboard)
router.get('/chart', authorization, access, getHistoryChart)
router.post('/', authorization, postHistory)
router.post('/invoice', authorization, postInvoice)

module.exports = router
