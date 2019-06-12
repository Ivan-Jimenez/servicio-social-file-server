const mongoose = require('mongoose')

const FinalReport = require('../models/servicio/documents/FinalReport')
const Servicio = require('../models/servicio/Servicio')

exports.final_new = (req, res, next) => {
  Servicio.find({ control: req.body.control })
    .exec()
    .then(servicio => {
      if (servicio.length < 1) {
        return res.status(409).json({
          error: 'El alumno no se encuentra registrado al Servicio Social.'
        })
      } else {
        saveFiles(servicio[0]._id, req.files, res)
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        error: err
      })
    })
}

exports.final_documents_get_one = (req, res, next) => {
  FinalReport.find({ servicio: req.params.servicioId })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        finalDocuments: docs.map(doc => {
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
}

exports.final_documents_get_all = (req, res, next) => {
  FinalReport.find()
    .select('_id servicio path')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        documents: doc.map(doc => {
          return {
            _id: doc._id,
            servicio: doc.servicio,
            path: doc.path
          }
        })
      }
    })
}

/******************************************************************************* 
 ****************************** Util Functions ********************************* 
*******************************************************************************/

function saveFiles (servicioId, files, res) {
  FinalReport.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.evaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.evaluacionFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.autoevaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.autoevaluacionFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.reporte[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.reporteFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.evaluacionActividades[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
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
