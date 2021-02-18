const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { response } = require('../helper/response')
const {
  register,
  setKeys,
  cahngePassword,
  activateUser,
  cekEmail
} = require('../model/user')

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
      const numb = `${new Date().getTime() * 34578}`
      const userKeys = numb.slice(8)
      const data = {
        firstName: '',
        lastName: '',
        userEmail,
        userPassword: encryptPassword,
        userAddress: '',
        roleId: 0,
        userKeys,
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
            html: `<h1>Click This Link..!!</h1><br /><a href="https://ankacoffee.netlify.app/activate/${userKeys}">Activate Your Account</a>`
          },
          (err) => {
            if (err) {
              response(res, 400, 'Invalid Email')
            } else {
              register(data)
              response(
                res,
                200,
                'register succeeded, check your email for activation'
              )
            }
          }
        )
      }
    } catch (error) {
      return response(res, 400, 'registration failed', error)
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { userEmail } = req.query
      const check = await cekEmail(userEmail)
      if (check.length > 0) {
        const numb = `${new Date().getTime() * 34578}`
        const userKeys = numb.slice(8)
        const data = {
          userKeys
        }

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'nodemailer42@gmail.com',
            pass: 'memo6789'
          }
        })
        await transporter.sendMail({
          from: '"Change Password"',
          to: userEmail,
          subject: 'A Cup Of Coffee',
          html: `<h1>Click This Link..!!</h1><br /><a href="https://ankacoffee.netlify.app/password/${userKeys}">Activate Your Account</a>`
        })

        const result = await setKeys(userEmail, data)
        return response(res, 200, 'set keys', result)
      }
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  changePassword: async (req, res) => {
    try {
      const { userPassword, userKeys } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const data = {
        userPassword: encryptPassword,
        userKeys: ''
      }
      const result = await cahngePassword(userKeys, data)
      return response(res, 200, 'set keys', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  activation: async (req, res) => {
    try {
      const { userKeys } = req.params
      const result = await activateUser(userKeys)
      return response(res, 200, 'Account active', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
