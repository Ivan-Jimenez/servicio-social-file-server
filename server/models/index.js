const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize('mariadb://root:root@localhost:3306/fileserver')
// const sequelize = new Sequelize('fileserver', 'root', 'root', {
//   dialect: 'mariadb',
//   dialectOptions: {connectTimeout: 1000} // mariadb connector option
// })

fs 
  .readdirSync(__dirname)
  .filter((file) =>
    file != 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
