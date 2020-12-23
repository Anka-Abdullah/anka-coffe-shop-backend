const router = require('Express').Router()
const { authorization, access } = require('../midleware/auth')
const {
  getProduct,
  postProduct,
  getProductById,
  deleteProduct,
  patchProduct
} = require('../controller/product')

router.get('/', authorization, getProduct)
router.get('/:id', access, getProductById)
router.post('/', access, postProduct)
router.patch('/:id', access, patchProduct)
router.delete('/:id', access, deleteProduct)

module.exports = router
