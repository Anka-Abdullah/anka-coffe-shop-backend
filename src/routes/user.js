const router = require('express').Router()
const { register, login, patchUser } = require('../controller/user')

router.post('/register', register)
router.post('/login', login)
router.patch('/:id', patchUser)
module.exports = router
