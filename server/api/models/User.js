const mongoose = require('mongoose')

/*******************************************************************************
 * NOTE: This fix the following deprecation warning:
 * (node:8484) DeprecationWarning: collection.ensureIndex is deprecated. Use 
 * createIndexes instead.
 ******************************************************************************/
mongoose.set('useCreateIndex', true)
/******************************************************************************/

const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const userSchema = mongoose.Schema({
  _id     : mongoose.Schema.Types.ObjectId,
  name    : { type: String, require  : true },
  lastName: { type: String, require  : true },
  email   : { type: String, requiered: true, unique: true, match: emailRegEx },
  password: { type: String, require  : true}
})

module.exports = mongoose.model('User', userSchema)