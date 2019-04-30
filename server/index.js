const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const {sequelize} = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000)
    console.log(`Server started on port 3000`)  
  })
