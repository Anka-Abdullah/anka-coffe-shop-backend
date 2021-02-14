const { response } = require('../helper/response')
const { patchUser, getUserById } = require('../model/user')
const fs = require('fs')

module.exports = {
  patchUser: async (req, res) => {
    try {
      const { id } = req.params
      const {
        firstName,
        lastName,
        userEmail,
        userAddress,
        userPhone
      } = req.body
      const data = {
        firstName,
        lastName,
        userEmail,
        userAddress,
        userPhone,
        image: req.file === undefined ? '' : req.file.filename
      }
      if (data.image === undefined) {
        delete data.image
      }
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  patchImage: async (req, res) => {
    try {
      const { id } = req.params
      const {
        firstName,
        lastName,
        userEmail,
        userAddress,
        userPhone
      } = req.body
      const data = {
        firstName,
        lastName,
        userEmail,
        userAddress,
        userPhone,
        image: req.file === undefined ? '' : req.file.filename
      }
      if (data.image === undefined) {
        delete data.image
      }
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'Image Successfully Changed', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { id } = req.params
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const data = {
        image: ''
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'Image Successfully Deleted', result)
    } catch (error) {}
  }
}
