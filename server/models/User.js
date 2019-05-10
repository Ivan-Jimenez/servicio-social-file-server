const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

// TODO: Hash user password

function hashPassword (user, options) {
  // // //console.log(user)
  // const SALT_FACTOR = 8
  // if (!user.changed('password')) {
  //   return;
  // }
  // return bcrypt
  //   .genSaltSync(SALT_FACTOR)
  //   .then(salt => bcrypt.hashAsync(user.password, salt, null))
  //   .catch(
  //     function (reason) {
  //       console.log(reason)
  //     }
  //   )
  //   .then(hash => {
  //     console.log({password: user.password})
  //     console.log(hash)
  //     // user.setDataValue('password', hash)
  //   })

  // return bcrypt.hash(user.password, SALT_FACTOR, function (err, hash){
  //   // user.setDataValue('password', hash)
  //   console.log({PASSWORD: user.password})
  //   console.log(hash)
  // })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
  User.prototype.comparePassword = function (password) {
    return this.password === password
    //FIXME: Don´t forget to uncoment after hashing the password
    // return bcrypt.compareSync(password, this.password)
  }
  return User
}