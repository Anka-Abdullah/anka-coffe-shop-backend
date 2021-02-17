const router = require('express').Router()
const multer = require('../midleware/multer')
const {
  register,
  login,
  forgotPassword,
  changePassword,
  activation
} = require('../controller/user')
const {
  getUserById,
  patchUser,
  patchImage,
  deleteImage
} = require('../controller/userProfile')

router.get('/:id', getUserById)
router.post('/register', register)
router.post('/login', login)
router.post('/forgot', forgotPassword)
router.patch('/password', changePassword)
router.patch('/active/:userKeys', activation)
router.patch('/:id', patchUser)
router.patch('/image/:id', multer, patchImage)
router.delete('/image/:id', deleteImage)
module.exports = router
