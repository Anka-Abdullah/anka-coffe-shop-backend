const router = require('express').Router()
const product = require('./routes/product')
const promo = require('./routes/promo')
const history = require('./routes/history')
const category = require('./routes/category')
const user = require('./routes/user')

router.use('/product', product)
router.use('/promo', promo)
router.use('/history', history)
router.use('/category', category)
router.use('/user', user)
module.exports = router
