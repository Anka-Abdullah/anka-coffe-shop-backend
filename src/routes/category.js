const router = require('Express').Router()
const { getCategory } = require('../controller/category')
router.get('/', getCategory)

module.exports = router
