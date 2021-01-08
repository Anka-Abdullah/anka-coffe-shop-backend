const router = require('express').Router()
const { authorization, access } = require('../midleware/auth')
const multer = require('../midleware/multer')
const {
  getProductByIdRedis,
  getProductRedis,
  clearDataRedis
} = require('../midleware/redis')
const {
  getProduct,
  postProduct,
  getProductById,
  deleteProduct,
  patchProduct
} = require('../controller/product')

router.get('/', authorization, getProductRedis, getProduct)
router.get('/:id', authorization, getProductByIdRedis, getProductById)
router.post('/', authorization, access, clearDataRedis, multer, postProduct)
router.patch(
  '/:id',
  authorization,
  access,
  clearDataRedis,
  multer,
  patchProduct
)
router.delete('/:id', authorization, access, clearDataRedis, deleteProduct)

module.exports = router
