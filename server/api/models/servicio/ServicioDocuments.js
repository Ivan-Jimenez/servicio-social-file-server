const mongoose = require('mongoose')

const servicioDocumentsSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', require: true, unique: false },
  documents: { type: String, require: true },
  path: { type: String, require: true }
})

module.exports = mongoose.model('ServicioDocuments', servicioDocumentsSchema)