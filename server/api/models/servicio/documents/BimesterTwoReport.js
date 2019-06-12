const mongoose = require('mongoose')

const bimesterTwoReportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', require: true },
  path: { type: String, require: true, unique: true }
})

module.exports = mongoose.model('BimesterTwoReport', bimesterTwoReportSchema)