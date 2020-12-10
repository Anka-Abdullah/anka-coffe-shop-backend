const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routesNavigation = require('./src/routesNavigation')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('path not found!')
})

const port = 3765
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
