const mongoose = require('mongoose')

const BimesterTwoReport = require('../models/servicio/documents/BimesterTwoReport')
const Servicio = require('../models/servicio/Servicio')

exports.report_new = (req, res, next) => {
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

exports.report_documents_get_one = (req, res, next) => {
  BimesterTwoReport.find({ servicio: req.params.Id })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        reportDocuments: docs.map(doc => {
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

exports.report_documents_get_all = (req, res, next) => {
  BimesterTwoReport.find()
    .select('_id servicio path')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        documents: docs.map(doc => {
          return {
            _Id: doc._id,
            servicio: doc.servicio,
            path: doc.path
          }
        })
      }
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(500).json({
        error: err
      })
    })
}

exports.report_documents_delete_one = (req, res, next) => {
  BimesterTwoReport.remove({ servicio: req.params.servicioId })
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

function saveFiles (servicioId, files, res) {
  BimesterTwoReport.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.reporte[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.evaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: servicioId,
      path: files.autoevaluacion[0].path
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
