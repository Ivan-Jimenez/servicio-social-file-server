const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, './files/')
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + 'filenamebitch' + file.originalname)
  }
})

// FIXME: This shit is not working for some reason.
const fileFilter = function (req, file, callback) {
  // if (file.mimeType === 'image/jepg' || file.mimeType == 'image/png') {
  //   return callback(null, true) // Acepts the file.
  // } else {
  //   callback(null, false) // Rejects the file.
  // }
  const ext = file.originalname.lastIndexOf('.');
  const fext = (ext < 1) ? '' : file.originalname.substr(ext + 1) 
  if (fext !== 'pdf') {
    return callback(null, false)
  }
  callback(null, true)
}

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  // Size limit of the file in Bytes.
  fileFilter: fileFilter
})

const Servicio = require('../models/Servicio')

router.get('/', (req, res, next) => {
  Servicio.find()
    .select('_id control name lastName startDate endDate documents')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        servicios: docs.map(doc => {
          return {
            _id: doc._id,
            control: doc.control,
            name: doc.name,
            lastName: doc.lastName,
            startDate: doc.startDate,
            endDate: doc.endDate,
            documents: doc.documents,
            request: {
              type: 'GET',
              url: `http://${process.env.SERVER}:${process.env.PORT}/servicio/${doc._id}`
            }
          }
        })
      }
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', uploadFile.array('FILE', 4), (req, res, next) => {
  console.log(req.file)
  const name = req.file.path.lastIndexOf('filenamebitch')
  console.log(req.file.path.substr(name + 13))
  // console.log(req.body)
  res.status(200).json({
    message: 'Fuck yeah!!'
  })
})


module.exports = router
