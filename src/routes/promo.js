const router = require('Express').Router()
const { authorization, access } = require('../midleware/auth')

const {
  getPromo,
  getPromoById,
  postPromo,
  patchPromo,
  deletePromo
} = require('../controller/promo')

router.get('/', authorization, getPromo)
router.get('/:id', access, getPromoById)
router.post('/', access, postPromo)
router.patch('/:id', access, patchPromo)
router.delete('/:id', access, deletePromo)

module.exports = router
