const mongoose = require('mongoose')

const ResidenciaDocumentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  documentName: {
    type: String,
    required: true
  },
  residenciaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Residencia',
    required: true,
    unique: true
  },
  documentType: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ResidenciaDocuments', ResidenciaDocumentsSchema)
