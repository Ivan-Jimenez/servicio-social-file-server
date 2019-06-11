const mongoose = require('mongoose')

const initialDocumentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', require: true, unique: false },
  path: { type: String, require: true }
})

module.exports = mongoose.model('InitialDocuments', initialDocumentsSchema)