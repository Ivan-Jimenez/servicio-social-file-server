const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./polices/AuthenticationControllerPolicy')

// FIXME: Maybe I will not need this.
// const formidable = require('formidable')
// const fs = require('fs')
// const path = require('path')

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
  app.post('/upload', )
  // app.post('/upload', function (req, res) {
  //   var form = formidable.IncomingForm()
  //   form.parse(req, function (err, fields, files) {
  //     // console.log(files.file.name)
  //     // console.log(files.file.path)
  //     var oldpath = files.file.path
  //     var newpath = path.join(__dirname, '/testUpload/', files.file.name)
  //     console.log('OLD PATH: ' + oldpath)
  //     console.log("NEW PATH: " + newpath)
  //     fs.rename(oldpath, newpath, function (err) {
  //       if (err) {
  //         console.log(err)
  //       }
  //     })
  //   })
  // })
}