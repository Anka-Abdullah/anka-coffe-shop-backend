const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const nodemailer = require('nodemailer')

const { response } = require('../helper/response')
const {
  register,
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
            'unverified email, check your email and click the link we provide or please re-sign up'
          )
        } else {
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
      }
      const result = await register(data)
      return response(res, 200, 'successful registration', result)
    } catch (error) {
      return response(res, 400, 'registration failed', error)
    }
  },
  // activateUser: async (req, res) => {
  //   async function main() {
  //     // Generate test SMTP service account from ethereal.email
  //     // Only needed if you don't have a real mail account for testing
  //     let testAccount = await nodemailer.createTestAccount()

  //     // create reusable transporter object using the default SMTP transport
  //     let transporter = nodemailer.createTransport({
  //       host: 'smtp.ethereal.email',
  //       port: 587,
  //       secure: false, // true for 465, false for other ports
  //       auth: {
  //         user: testAccount.user, // generated ethereal user
  //         pass: testAccount.pass // generated ethereal password
  //       }
  //     })

  //     // send mail with defined transport object
  //     let info = await transporter.sendMail({
  //       from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //       to: 'bar@example.com, baz@example.com', // list of receivers
  //       subject: 'Hello ✔', // Subject line
  //       text: 'Hello world?', // plain text body
  //       html: `<p>Click <a href="http://localhost:3000/sessions/recover/' + recovery_token + '">here</a> to reset your password</p>`
  //     })

  //     console.log('Message sent: %s', info.messageId)
  //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //     // Preview only available when sending through an Ethereal account
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //   }

  //   main().catch(console.error)
  // },
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
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '' && req.file !== undefined) {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  patchImage: async (req, res) => {
    try {
      const { id } = req.params
      const data = {
        image: req.file === undefined ? '' : req.file.filename
      }
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '' && req.file !== undefined) {
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
  }
}
