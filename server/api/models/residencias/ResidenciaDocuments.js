const mongoose = require('mongoose')

const ResidenciaDocumentsSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
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

module.exports = mongoose.Schema('ResidenciaDocuments', ResidenciaDocumentsSchema)
