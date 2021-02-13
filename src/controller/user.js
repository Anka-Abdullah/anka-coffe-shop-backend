const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { response } = require('../helper/response')
const {
  register,
  setKeys,
  cahngePassword,
  getUserByKeys,
  activateUser,
  cekEmail,
  patchUser,
  getUserById,
  deleteUser
} = require('../model/user')
const fs = require('fs')

module.exports = {
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const email = await cekEmail(userEmail)
      if (email.length < 1) {
        return response(res, 400, 'Email Not Found, Please Sign Up First')
      } else {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          email[0].userPassword
        )
        if (email[0].userStatus !== 1) {
          return response(
            res,
            400,
            'check your email and click the link we provide or please re-sign up'
          )
        } else {
          if (!checkPassword) {
            return response(res, 400, 'Wrong Password')
          } else {
            const {
              userId,
              firstName,
              lastName,
              userEmail,
              userAddress,
              userPhone,
              userStatus,
              image,
              roleId
            } = email[0]
            const payload = {
              userId,
              firstName,
              lastName,
              userEmail,
              userAddress,
              userPhone,
              userStatus,
              image,
              roleId
            }
            const token = jwt.sign(payload, 'sayang', {
              expiresIn: 7 * 24 * 60 * 60
            })
            const result = { ...payload, token }
            return response(res, 200, 'Login success', result)
          }
        }
      }
    } catch (error) {
      return response(res, 400, 'bad request', error)
    }
  },
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userPhone } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const data = {
        firstName: '',
        lastName: '',
        userEmail,
        userPassword: encryptPassword,
        userAddress: '',
        roleId: 0,
        userStatus: 0,
        userPhone
      }
      const email = await cekEmail(userEmail)
      if (email.length > 0) {
        return response(res, 400, 'Email has been existed')
      } else {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'nodemailer42@gmail.com',
            pass: 'memo6789'
          }
        })
        transporter.sendMail(
          {
            from: '"Activate Account"',
            to: userEmail,
            subject: 'A Cup Of Coffee',
            text: 'Click This Link..!!'
            // html: `your code is ${keys}`
          },
          (err) => {
            if (err) {
              response(res, 400, 'Invalid Email')
            } else {
              register(data)
              response(res, 200, 'send email')
            }
          }
        )
      }
    } catch (error) {
      return response(res, 400, 'registration failed', error)
    }
  },
  getUserByKeys: async (req, res) => {
    try {
      const { userKeys } = req.body
      const result = await getUserByKeys(userKeys)
      return response(res, 200, 'user', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
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
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const result = await deleteUser(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { userEmail } = req.body
      const check = await cekEmail(userEmail)
      if (check.length > 0) {
        const numb = `${new Date().getTime() * 34578}`
        const keys = numb.slice(8)
        const data = {
          userKeys: keys
        }

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'nodemailer42@gmail.com', // generated ethereal user
            pass: 'memo6789' // generated ethereal password
          }
        })
        await transporter.sendMail({
          from: '"Change Password"', // sender address
          to: userEmail, // list of receivers
          subject: 'A Cup Of Coffee', // Subject line
          text: 'Click This Link..!!', // plain text body
          html: `your code is ${keys}` // html body
        })

        const result = await setKeys(userEmail, data)
        return response(res, 200, 'set keys', result)
      }
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  changePassword: async (req, res) => {
    try {
      const { userPassword, userKeys } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const data = {
        userPassword: encryptPassword
      }
      const result = await cahngePassword(userKeys, data)
      return response(res, 200, 'set keys', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  activation: async (req, res) => {
    try {
      const { userEmail } = req.params
      const result = await activateUser(userEmail)
      return response(res, 200, 'email active', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
