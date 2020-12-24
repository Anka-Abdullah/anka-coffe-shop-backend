const multer = require('multer')
const { response } = require('../helper/response')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/png') {
    cb(new Error('Extension File Must Be PNG or JPG'))
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
}).single('productImage')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response(res, 400, err.message)
    } else if (err) {
      // An unknown error occurred when uploading.
      return response(res, 400, err.message)
    }
    next()
    // Everything went fine.
  })
}

module.exports = uploadFilter
