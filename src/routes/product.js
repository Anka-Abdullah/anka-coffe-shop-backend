const router = require('Express').Router()
const { authorization, access } = require('../midleware/auth')
const multer = require('../midleware/multer')
// const { getProductByIdRedis, clearDataRedis } = require('../midleware/redis')
const {
  getProduct,
  postProduct,
  getProductById,
  deleteProduct,
  patchProduct
} = require('../controller/product')

router.get('/', authorization, getProduct)
router.get('/:id', authorization, getProductById)
router.post('/', multer, postProduct)
router.patch('/:id', access, patchProduct)
router.delete('/:id', access, deleteProduct)

module.exports = router
