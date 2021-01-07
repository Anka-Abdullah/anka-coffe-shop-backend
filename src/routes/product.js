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
  deleteImage,
  patchProduct,
  patchImage
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
router.patch(
  '/image/:id',
  authorization,
  access,
  clearDataRedis,
  multer,
  patchImage
)
router.delete('/:id', authorization, access, clearDataRedis, deleteProduct)
router.delete('/image/:id', authorization, access, clearDataRedis, deleteImage)

module.exports = router
