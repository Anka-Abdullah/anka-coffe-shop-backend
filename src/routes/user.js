const router = require('Express').Router()
const { register, login } = require('../controller/user')

router.post('/register', register)
router.post('/login', login)
router.patch('/')
module.exports = router
