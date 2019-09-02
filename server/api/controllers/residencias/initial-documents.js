const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const Residencia = require('../../models/residencias/Servicio')
const ResidenciaDocuments = require('../../models/residencias/ResidenciaDocuments')

/** Get One */
exports.get = (req, res, next) => {
  ResidenciaDocuments
    .find({ residenciaId: req.params.residenciaId, documentType: 'Inicial' })
    .exec()
    .then(docs => {
      const response = {
        initialDocuments: docs.map(doc => {
          return {
            _id : doc._id,
            residenciaId: doc.residenciaId,
            documentName: doc.documentName,
            documentType: doc.documentType,
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

/** Get File */
exports.getFile = (req, res, next )=> {
  console.log(path.join(__dirname + '/../../files/residencias/testFile.pdf'))
  ResidenciaDocuments
    .find({ 
      residenciaId: req.params.residenciaId, 
      _id: req.params.fileId,
      documentType: 'Inicial'
    })
    .then(result => {
      console.log(result)
      res.status(200).sendFile(path.join(__dirname + '/../../../' + result[0].path))
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

/** Delete */
exports.delete = (req, res, next) => {
  let filesToDelete
  ResidenciaDocuments
    .find({ residenciaId: req.params.residenciaId, documentType: 'Inicial' })
    .exec()
    .then(files => {
      filesToDelete = files
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
  ResidenciaDocuments
    .deleteMany({ residenciaId: req.params.residenciaId, documentType: 'Inicial' })
    .exec()
    .then(result => {
      console.log(result)
      filesToDelete.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) {
            throw err
          }
          console.log('File Deleted!')
        })
      })
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

/** New */
exports.new = (req, res, next) => {
  console.log(req.files)
  console.log(req.params.residenciaId)
  const residenciaId = req.params.residenciaId
  Residencia.find({ _id: residenciaId })
    .exec()
    .then(residencia => {
      ResidenciaDocuments.find({ residenciaId: residenciaId, documentType: 'Inicial' })
        .exec()
        .then(documents => {
          console.log(documents)
          if (documents.length >= 1) {
            return res.status(409).json({
              error: 'Los documentos ya habían sido guardados con anterioridad.'
            })
          } else {
            saveFiles(residencia[0]._id, req.files, res)
          }
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
 **************************Util Fuctions****************************************
 ******************************************************************************/

// TODO: Replace the name of the documents

/**
 * @param {mongoose.ObjectId} servicioId 
 * @param {Array} files -> The server recives the documents in the following order:
 *  1. Solicitud de Servicio Social
 *  2. Plan de trabajo
 *  3. Carta Compromiso
 *  4. Carta Asignación
 * @param {Response} res 
 */
function saveFiles (residenciaId, files, res) {
  ResidenciaDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Solicitud de Servicio Social',
      residenciaId: servicioId,
      documentType: 'Inicial',
      path: files.solicitud[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Plan de Trabajo',
      residenciaId: servicioId,
      documentType: 'Inicial',
      path: files.planTrabajo[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Carta Compromiso',
      residenciaId: servicioId,
      documentType: 'Inicial',
      path: files.cartaCompromiso[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Carta Asignación',
      residenciaId: servicioId,
      documentType: 'Inicial',
      path: files.cartaAsignacion[0].path
    }
  ])
  .then(result => {
    res.status(201).json({
      message: 'Documentos Iniciales guardados!',
      savedDocuments: result.map(doc => {
        return {
          _id: doc._id,
          residenciaId: doc.residenciaId,
          documentName: doc.documentName,
          documentType: doc.documentType,
          request: {
            type: 'GET',
            url: `http://${process.env.SERVER}:${process.env.PORT}/residencias/initial-documents/get/${doc.servicioId}`
          }
        }
      })
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
