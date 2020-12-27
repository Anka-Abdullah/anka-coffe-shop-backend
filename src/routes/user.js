const router = require('Express').Router()
const { register, login, patchUser } = require('../controller/user')

router.post('/register', register)
router.post('/login', login)
router.patch('/:id', patchUser)
module.exports = router
