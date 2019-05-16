const mongoose = require('mongoose')

const servicioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  control: {
    type: Number,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true
  },
  startDate: {
    type: Date,
    require: true
  },
  endDate: {
    type: Date,
    require: true
  },
  documents: {
    type: JSON,
    require: true
  }
})

module.exports =  mongoose.model('Servicio', servicioSchema)