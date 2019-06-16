const mongoose = require('mongoose')

const servicioSchema = mongoose.Schema({
  _id       : mongoose.Schema.Types.ObjectId,
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  control   : { type: Number, require: true, unique: true },
  career    : { type: String, require: true },
  name      : { type: String, require: true },
  lastName  : { type: String, require: true },
  programName: { type: String, require: true },
  startDate : { type: Date,   require: true },
  endDate   : { type: Date,   require: true }
})

module.exports =  mongoose.model('Servicio', servicioSchema)
