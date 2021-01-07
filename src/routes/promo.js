const router = require('express').Router()
const { authorization, access } = require('../midleware/auth')
const { getPromoRedis, clearPromoRedis } = require('../midleware/redis')
const multer = require('../midleware/multer')

const {
  getPromo,
  getPromoById,
  postPromo,
  patchPromo,
  deletePromo
} = require('../controller/promo')

router.get('/', authorization, getPromoRedis, getPromo)
router.get('/:id', authorization, getPromoById)
router.post('/', authorization, access, clearPromoRedis, multer, postPromo)
router.patch('/:id', authorization, access, clearPromoRedis, multer, patchPromo)
router.delete('/:id', authorization, access, clearPromoRedis, deletePromo)

module.exports = router
