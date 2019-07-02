const mongoose = require('mongoose')

const ServicioDocuments = require('../../models/servicio/ServicioDocuments')
const Servicio = require('../../models/servicio/Servicio')

exports.new = (req, res, next) => {
  Servicio.find({ control: req.body.control })
    .exec()
    .then(servicio => {
      if (servicio.length < 1) {
        return res.status(409).json({
          error: 'El alumno no se encuentra registrado al Servicio Social.'
        })
      } else {
        saveFiles(servicio[0]._id, req.files, req.body.documents, res)
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        error: err
      })
    })
}

exports.getOne = (req, res, next) => {
  ServicioDocuments
    .find({
      servicio: req.params.servicioId,
      documents: documents
    })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        finalDocuments: docs.map(doc => {
          return {
            _id: doc._id,
            servicio: doc.servicio,
            documents: doc.documents,
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
}

exports.getAll = (req, res, next) => {
  ServicioDocuments.find()
    .select('_id servicio path')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        documents: doc.map(doc => {
          return {
            _id: doc._id,
            servicio: doc.servicio,
            documents: doc.documents,
            path: doc.path
          }
        })
      }
    })
}

exports.deleteOne = (req, res, next) => {
  ServicioDocuments
    .remove({
      servicioId: req.params.servicioId,
      documents: 'Finales'
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

/*******************************************************************************
 ****************************** Util Functions *********************************
*******************************************************************************/

function saveFiles (servicioId, files, documents, res) {
  ServicioDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.evaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.evaluacionFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.autoevaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.autoevaluacionFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.reporte[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.reporteFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.evaluacionActividades[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      documents: documents,
      path: files.cartaTerminacion[0].path
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
