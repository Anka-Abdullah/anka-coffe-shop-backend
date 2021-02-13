const router = require('express').Router()
const multer = require('../midleware/multer')
const {
  getUserByKeys,
  register,
  login,
  patchUser,
  deleteUser,
  forgotPassword,
  changePassword
} = require('../controller/user')

router.get('/keys', getUserByKeys)
router.post('/register', register)
router.post('/login', login)
router.post('/', forgotPassword)
router.patch('/password', changePassword)
router.patch('/:id', multer, patchUser)
router.delete('/:id', multer, deleteUser)
module.exports = router
