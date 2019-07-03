const mongoose = require('mongoose')

const servicioDocumentsSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	servicioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servicio',
    required: true,
    unique: false
  },
  documents: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ServicioDocuments', servicioDocumentsSchema)