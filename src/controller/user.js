const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('../helper/response')
const { register, cekEmail } = require('../model/user')

module.exports = {
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const email = await cekEmail(userEmail)
      if (email.length < 1) {
        return response(res, 200, 'Email Not Found')
      } else {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          email[0].userPassword
        )
        if (!checkPassword) {
          return response(res, 400, 'Wrong Password')
        } else {
          const { userId, userName, userEmail, userStatus, roleId } = email[0]
          const payload = {
            userId,
            userName,
            userEmail,
            userStatus,
            roleId
          }
          const token = jwt.sign(payload, 'sayang', {
            expiresIn: 7 * 24 * 60 * 60
          })
          const result = { ...payload, token }
          return response(res, 200, 'Login success', result)
        }
      }
    } catch (error) {
      return response(res, 400, 'bad request', error)
    }
  },
  register: async (req, res) => {
    try {
      const {
        userName,
        userEmail,
        userPassword,
        userAddress,
        userStatus,
        userPhone
      } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const data = {
        userName,
        userEmail,
        userPassword: encryptPassword,
        userAddress,
        userStatus,
        userPhone,
        userCreatedAt: new Date().toUTCString()
      }
      const email = await cekEmail(userEmail)
      if (email.length < 1) {
        return response(res, 200, 'Email Not Found')
      }
      const result = await register(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Register Failed', error)
    }
  }
}
