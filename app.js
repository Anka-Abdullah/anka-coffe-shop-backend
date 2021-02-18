require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routesNavigation = require('./src/routesNavigation')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api1', express.static('uploads'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/api1', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('path not found!')
})

const port = process.env.PORT
app.listen(port, () => {
  console.log('Server is running')
})
