const router = require('Express').Router()
const { authorization } = require('../midleware/auth')
const { getCategory } = require('../controller/category')
router.get('/', authorization, getCategory)

module.exports = router
