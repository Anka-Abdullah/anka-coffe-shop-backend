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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('path not found!')
})

const port = 3765
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
