const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const ServicioDocuments = require('../../models/servicio/ServicioDocuments')
const Servicio = require('../../models/servicio/Servicio')

/** New */
exports.new = (req, res, next) => {
  const servicioId = req.params.servicioId
  Servicio.find({ _id: servicioId })
    .exec()
    .then(servicio => {
      console.log(servicio)
      if (servicio.length >= 1) {
        ServicioDocuments.find({ servicioId: servicioId, documentType: req.body.documentType })
          .exec()
          .then(documents => {
            console.log(documents)
            if (documents.length >= 1) {
              return res.status(409).json({
                error: 'Los documentos ya habían sido guardados anteriormente!'
              })
            } else {
              saveFiles(servicioId, req.files, req.body.documentType, res)
            }
          })
      } else {
        return res.status(409).json({
          error: 'EL Servicio Social no se encuentra registrado!'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

/** Get all the files for a bimester report  */
exports.get = (req, res, next) => {
  console.log(req.body.documentType)
  ServicioDocuments
    .find({ servicioId: req.params.servicioId, documentType: req.body.documentType })
    .exec()
    .then(docs => {
      const response = {
        bimesterReport: docs.map(doc => {
          return {
            _id: doc._id,
            servicioId: doc.servicioId,
            documentName: doc.documentName,
            documentType: doc.documentType,
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

/** Get File */
exports.getFile = (req, res, next) => {
  console.log(path.join(__dirname + '/../../files/servicio/testFile.pdf'))
  ServicioDocuments
    .find({
      servicioId: req.params.servicioId,
      _id: req.params.fileId,
      // NOTE: This is similar to SELECT * FROM ServicioDocuments WHERE 
      // documentType LiKE '%Bimestre%';
      // documentType: /.*Bimestre.*/
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
  ServicioDocuments
    .find({ servicioId: req.params.servicioId, documentType: req.body.documentType })
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
  ServicioDocuments
    .deleteMany({ servicioId: req.params.servicioId, documentType: req.body.documentType })
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

/*******************************************************************************
 ****************************** Util Functions *********************************
*******************************************************************************/

/**
 * @param {mongoose.ObjectId} servicioId 
 * @param {Array} files -> The server recives the documents in the following order:
 *  1. Reporte Bimestral
 *  2. Evaluación Cualitativa Llenada por la Institución
 *  3. Autoevalaución Cualitativa Llenada por el Estudiante 
 * @param {Response} res 
 */
function saveFiles (servicioId, files, documentType, res) {
  ServicioDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Reporte Bimestral',
      servicioId: servicioId,
      documentType: documentType,
      path: files.reporte[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Evaluación Cualitativa Llenada por la Institutción',
      servicioId: servicioId,
      documentType: documentType,
      path: files.evaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Autoevaluación Culitatica Llenada por el Estudiante',
      servicioId: servicioId,
      documentType: documentType,
      path: files.autoevaluacion[0].path
    }
  ])
  .then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Documentos de Reporte Bimestral guardados!',
      savedDocuements: result.map(doc => {
        return {
          _id: doc._id,
          servicioId: doc.servicioId,
          documentName: doc.documentName,
          documentType: doc.documentType,
          request: {
            type: 'GET',
            url: `http://${process.env.SERVER}:${process.env.PORT}/servicio/bimester-report/get/${doc.servicioId}`
          }
        }
      })
    })
  })
  .catch(err => {
    console.log(err)
    if (err.name === 'ValidationError') {
      res.status(400).json({
        error: 'Operación fallida. Datos incompletos!',
        missing: err.errors
      })
    } else {
      res.status(500).json({
        error: err
      })
    }
  })
}
