const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./polices/AuthenticationControllerPolicy')

const formidable = require('formidable')
const fs = require('fs')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register),
  app.post('/login',
    AuthenticationController.login
  ),
  app.post('/newSocialService',
    AuthenticationControllerPolicy.newSocialService,
    AuthenticationController.newSocialService
  ),

  // File upload test
  app.post('/upload', (req, res) => {
    res.send({message:'sdsadsadsadsada'})
    const form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
      const oldpath = files.file.path
      const newpath = './testUpload/' + files.filetoupload.name
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err
        res.write('File uploaded and moved!')
        res.end()
      })
    })
  })
}