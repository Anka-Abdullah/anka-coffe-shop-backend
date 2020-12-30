const router = require('express').Router()
const multer = require('../midleware/multer')
const { register, login, patchUser, deleteUser } = require('../controller/user')

router.post('/register', register)
router.post('/login', login)
router.patch('/:id', multer, patchUser)
router.delete('/:id', multer, deleteUser)
module.exports = router
