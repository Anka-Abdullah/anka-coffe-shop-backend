const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coffeeshop'
})

connection.connect((error) => {
  if (error) {
    console.log(error)
  }
  console.log('connected database')
})

module.exports = connection
