const router = require('Express').Router()
const product = require('./routes/product')
const promo = require('./routes/promo')

router.use('/product', product)
router.use('/promo', promo)
module.exports = router
