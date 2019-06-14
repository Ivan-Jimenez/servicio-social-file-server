const mongoose = require('mongoose')

const Servicio = require('../models/servicio/Servicio')
const ServicioDocuments = require('../models/servicio/ServicioDocuments')

exports.getAll = (req, res, next) => {
  Servicio.find()
    .select('_id control name lastName startDate endDate')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        servicios: docs.map(doc => {
          return {
            _id      : doc._id,
            control  : doc.control,
            name     : doc.name,
            lastName : doc.lastName,
            programName: doc.programName,
            startDate: doc.startDate,
            endDate  : doc.endDate,
            request  : {
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
}

exports.initialDocumentsGetOne = (req, res, next) => {
  ServicioDocuments.find({ servicio: req.params.servicioId, documents: 'Iniciales' })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        initialDocuments: docs.map(doc => {
          return {
            _id     : doc._id,
            servicio: doc.servicio,
            documents: doc.documents,
            path    : doc.path
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
}

exports.initialDocumentsGetAll = (req, res, next) => {
  ServicioDocuments.find({ documents: 'Iniciales' })
    .select('_id servicio path')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        documents: docs.map(doc => {
          return {
            _id     : doc._id,
            servicio: doc.servicio,
            documents: doc.documents,
            path    : doc.path
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
}

exports.initialDocumentsDeleteOne = (req, res, next) => {
  ServicioDocuments
    .remove({
      servicio: req.params.servicioId,
      documents: 'Iniciales'
    })
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
}


// TODO: Delete the documents
exports.deleteOne = (req, res, next) => {
  Servicio.remove({ _id: req.params.servicioId })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Servicio Social borrado!'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.new = (req, res, next) => {
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
        _id      : servicioId,
        control  : req.body.control,
        career   : req.body.career,
        name     : req.body.name,
        lastName : req.body.lastName,
        programName: req.body.programName,
        startDate: req.body.startDate,
        endDate  : req.body.endDate
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
}

/*******************************************************************************
 ************************* Util Fuctions ***************************************
 ******************************************************************************/

// TODO: Find a better solution for this. However this works for now.
function saveFiles (servicioId, files, res) {
  ServicioDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: 'Iniciales',
      path: files.solicitud[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: 'Iniciales',
      path: files.planTrabajo[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: 'Iniciales',
      path: files.cartaCompromiso[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: 'Iniciales',
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
