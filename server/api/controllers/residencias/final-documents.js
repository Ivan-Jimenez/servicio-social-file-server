const mongoose = require('mongoose')

const ResidenciaDocuments = require('../../models/residencias/ResidenciaDocuments')
const Residencia = require('../../models/residencias/Residencia')

exports.new = (req, res, next) => {
  Residencia.find({ control: req.body.control })
    .exec()
    .then(residencia => {
      if (residencia.length < 1) {
        return res.status(409).json({
          error: 'El alumno no se encuentra registrado en residencias.'
        })
      } else {
        saveFiles(residencia[0]._id, req.files, req.body.documents, res)
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
  ResidenciaDocuments
    .find({
      residencia: req.params.residenciaId,
      documents: documents
    })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        finalDocuments: docs.map(doc => {
          return {
            _id: doc._id,
            residencia: doc.residencia,
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
  ResidenciaDocuments.find()
    .select('_id servicio path')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        documents: doc.map(doc => {
          return {
            _id: doc._id,
            residencia: doc.residencia,
            documents: doc.documents,
            path: doc.path
          }
        })
      }
    })
}

exports.deleteOne = (req, res, next) => {
  ResidenciaDocuments
    .remove({
      residenciaId: req.params.residenciaId,
      documents: 'Final'
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

// TODO: Replace documents name

function saveFiles (residenciaId, files, documents, res) {
  ServicioDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.evaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.evaluacionFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.autoevaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.autoevaluacionFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.reporte[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.reporteFinal[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
      documents: documents,
      path: files.evaluacionActividades[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicio: residenciaId,
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
