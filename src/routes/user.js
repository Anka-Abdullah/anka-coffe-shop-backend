const router = require('express').Router()
const multer = require('../midleware/multer')
const {
  getUserByKeys,
  register,
  login,
  forgotPassword,
  changePassword,
  activation
} = require('../controller/user')
const { patchUser } = require('../controller/userProfile')

router.get('/keys', getUserByKeys)
router.post('/register', register)
router.post('/login', login)
router.post('/forgot', forgotPassword)
router.patch('/password', changePassword)
router.patch('/active/:userKeys', activation)
router.patch('/:id', multer, patchUser)
module.exports = router
