const router = require('Express').Router()

const {
  getPromo,
  getPromoById,
  postPromo,
  patchPromo,
  deletePromo
} = require('../controller/promo')

router.get('/', getPromo)
router.get('/:id', getPromoById)
router.post('/', postPromo)
router.patch('/:id', patchPromo)
router.delete('/:id', deletePromo)

module.exports = router
