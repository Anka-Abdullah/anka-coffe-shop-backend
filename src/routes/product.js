const router = require('Express').Router()

const {
  getProduct,
  postProduct,
  getProductById,
  patchProduct
} = require('../controller/product')

router.get('/', getProduct)
router.get('/:id', getProductById)
router.post('/', postProduct)
router.patch('/:id', patchProduct)

module.exports = router
