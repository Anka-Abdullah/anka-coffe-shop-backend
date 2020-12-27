const connection = require('../config/mysql')

module.exports = {
  actionQuery: (...argument) => {
    return new Promise((resolve, reject) => {
      connection.query(...argument, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  }
}
