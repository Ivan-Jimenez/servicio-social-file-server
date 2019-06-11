const express    = require('express')
const app        = express()
const morgan     = require('morgan')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')

// Routes
const userRoutes     = require('./api/routes/user')
const servicioRoutes = require('./api/routes/servicio')

mongoose.connect(`mongodb://${process.env.DATABASE_SERVER}/${process.env.DATABASE}`, {useNewUrlParser: true})
mongoose.Promise = global.Promise // Shuts the deprecation warning

app.use(morgan('dev'))
app.use('/files', express.static('files'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET'
    )
    return res.status(200).json({})
  }
  next()
})

app.use('/user', userRoutes)
app.use('/servicio', servicioRoutes)

app.use((req, res, next) => {
  const error = new Error('Nice try bitch!!')
  error.status = 404
  next(error)
})

app.use((error, req, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app 