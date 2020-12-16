const router = require('express').Router()
const product = require('./routes/product')
const promo = require('./routes/promo')
const history = require('./routes/history')
const detailHistory = require('./routes/detailHistory')
const category = require('./routes/category')

router.use('/product', product)
router.use('/promo', promo)
router.use('/history', history)
router.use('/detailhistory', detailHistory)
router.use('/category', category)
module.exports = router
