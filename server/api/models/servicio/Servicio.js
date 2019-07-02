const mongoose = require('mongoose')

const servicioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  supervisor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  control: {
    type: Number,
    required: true,
    unique: true 
  },
  career: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName : {
    type: String,
    required: true
  },
  programName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
 	endDate: {
     type: Date,
     required: true
  }
})

module.exports =  mongoose.model('Servicio', servicioSchema)
