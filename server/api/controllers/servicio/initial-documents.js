const mongoose = require('mongoose')

const Servicio = require('../../models/servicio/Servicio')
const ServicioDocuments = require('../../models/servicio/ServicioDocuments')


exports.initialDocumentsGetOne = (req, res, next) => {
  ServicioDocuments.find({ servicio: req.params.servicioId, documents: 'Iniciales' })
    .exec()
    .then(docs => {
      const response = {
        // count: docs.length,
        initialDocuments: docs.map(doc => {
          return {
            _id : doc._id,
            servicio: doc.servicio,
            documents: doc.documents,
            path : doc.path
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

/** New */
exports.new = (req, res, next) => {
  console.log(req.body)
  const servicioId = req.params.servicioId
  Servicio.find({ _id: servicioId })
    .exec()
    .then(servicio => {
      console.log(servicio[0])
      saveFiles(servicio[0]._id, req.files, res)
    })
    // .catch(err => {
    //   console.log(err)
    //   res.status(500).json({
    //     error: err
    //   })
    // })
}

/*******************************************************************************
 ************************* Util Fuctions ***************************************
 ******************************************************************************/

// TODO: Find a better solution for this. However this works for now.
function saveFiles (servicioId, files, res) {
  ServicioDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      servicioId: servicioId,
      documents: 'Iniciales',
      path: files.solicitud[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicioId: servicioId,
      documents: 'Iniciales',
      path: files.planTrabajo[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicioId: servicioId,
      documents: 'Iniciales',
      path: files.cartaCompromiso[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      servicioId: servicioId,
      documents: 'Iniciales',
      path: files.cartaAsignacion[0].path
    }
  ])
  .then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Documentos Iniciales guardados!',
      savedDocuments: {
        servicioId: result.servicioId,
        documents: result.documents,
        request: {
          type: 'GET',
          url: `http://${process.env.SERVER}:${process.env.PORT}/servicio/initial-documents/get/${result[0].servicioId}`
        }
      }
    })
  })
  .catch(err => {
    console.log(err)
    if (err.name === 'ValidationError') {
      res.status(400).json({
        error: 'Operación fallida. Datos imcompletos!',
        missing: err.errors
      })
    } else {
      
      res.status(500).json({
        error: err
      })
    }
  })
}
