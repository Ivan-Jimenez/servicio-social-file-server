const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const Servicio = require('../models/servicio/Servicio')
const InitialDocuments = require('../models/servicio/documents/InitialDocuments')

const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, './files/')
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/ /g, '-'))
  }
})

const fileFilter = function (req, file, callback) {
  const ext = file.originalname.lastIndexOf('.');
  const fext = (ext < 1) ? '' : file.originalname.substr(ext + 1) 
  if (fext !== 'pdf') {
    return callback(null, false)
  }
  callback(null, true)
}

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
}).fields([
  { name: 'solicitud' },
  { name: 'planTrabajo' },
  { name: 'cartaCompromiso' },
  { name: 'cartaAsignacion' }
])

/** Fetch all Servicio Social */
router.get('/', (req, res, next) => {
  Servicio.find()
    .select('_id control name lastName startDate endDate')
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
            request: {
              type: 'GET',
              url : `http://${process.env.SERVER}:${process.env.PORT}/servicio/${doc._id}`
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

/** Fetch initial documents */
router.get('/initialDocuments/:Id', (req, res, next) => {
  InitialDocuments.find({ servicio: req.params.Id })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        initialDocuments: docs.map(doc => {
          return {
            _id: doc._id,
            servicio: doc.servicio,
            path: doc.path
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

/** Fetch all inital documents */
router.get('/initialDocuments/', (req, res, next) => {
  InitialDocuments.find()
    .select('_id servicio path')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        documents: docs.map(doc => {
          return {
            _id: doc._id,
            servicio: doc.servicio,
            path: doc.path
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

/** Delete Initial Documents */
router.delete('/initialDocuments/:servicioId', (req, res, next) => {
  InitialDocuments.remove({ servicio: req.params.servicioId })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Documentos borrados!'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

/** Delete Servicio Social */
router.delete('/delete/:servicioId', (req, res, next) => {
  Servicio.remove({ _id: req.params.servicioId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Servicio Social borrado!'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

// TODO: Find a better solution for this. However this works for now.
function saveFiles(servicioId, files, res) {
  InitialDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.solicitud[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.planTrabajo[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.cartaCompromiso[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.cartaAsignacion[0].path
    }
  ])
  .then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Documentos guardados!'
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

/** New Servicio Social */
router.post('/', uploadFile, (req, res, next) => {
  // TODO: Delete Servicio Social of there is an error storing the files.
  const servicioId = new mongoose.Types.ObjectId()
  console.log(servicioId)
  console.log(req.files.solicitud)

  Servicio.find({ control: req.body.control })
    .exec()
    .then(servicio => {
      if (servicio.length >= 1) {
        return res.status(409).json({
          error: 'El alumno ya se encuntra registrado al Servicio Social!'
        })
      }
      const newServicio = new Servicio({
        _id: servicioId,
        control: req.body.control,
        career: req.body.career,
        name: req.body.name,
        lastName: req.body.lastName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      })
      newServicio.save()
        .then(result => {
          console.log(result)
          saveFiles(servicioId, req.files, res)
        })
        .catch(err => {
          console.log(err)
          return res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router
