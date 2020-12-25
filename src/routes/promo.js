const router = require('Express').Router()
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
router.get('/:id', access, getPromoById)
router.post('/', access, clearPromoRedis, multer, postPromo)
router.patch('/:id', access, clearPromoRedis, multer, patchPromo)
router.delete('/:id', clearPromoRedis, access, deletePromo)

module.exports = router
