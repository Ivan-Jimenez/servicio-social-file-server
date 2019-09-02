const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const ResidenciaDocuments = require('../../models/residencias/ResidenciaDocuments')
const Residencia = require('../../models/residencias/Residencia')

/** New */
exports.new = (req, res, next) => {
  const residenciaId = req.params.residenciaId
  Residencia.find({ _id: residenciaId })
    .exec()
    .then(residencia => {
      console.log(residencia)
      if (residencia.length >= 1) {
        ResidenciaDocuments.find({ residenciaId: residenciaId, documentType: req.body.documentType })
          .exec()
          .then(documents => {
            console.log(documents)
            if (documents.length >= 1) {
              return res.status(409).json({
                error: 'Los documentos ya habían sido guardados anteriormente!'
              })
            } else {
              saveFiles(residenciaId, req.files, req.body.documentType, res)
            }
          })
      } else {
        return res.status(409).json({
          error: 'La residencia ya se encuentra resgitrada!'
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

/** Get all the files for a report  */
exports.get = (req, res, next) => {
  console.log(req.body.documentType)
  ResidenciaDocuments
    .find({ residenciaId: req.params.residenciaId, documentType: req.body.documentType })
    .exec()
    .then(docs => {
      const response = {
        report: docs.map(doc => {
          return {
            _id: doc._id,
            residenciaId: doc.residenciaId,
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
  console.log(path.join(__dirname + '/../../files/residencias/testFile.pdf'))
  ResidenciaDocuments
    .find({
      residenciaId: req.params.residenciaId,
      _id: req.params.fileId,
      // NOTE: This is similar to SELECT * FROM ServicioDocuments WHERE 
      // documentType LiKE '%Bimestre%';
      // documentType: /.*Bimestre.*/
      documentType: req.body.documentType
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
    .find({ resideniciaId: req.params.residenciaId, documentType: req.body.documentType })
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
    .deleteMany({ residenciaId: req.params.residenciaId, documentType: req.body.documentType })
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

// TODO: Replace the documents name

/**
 * @param {mongoose.ObjectId} servicioId 
 * @param {Array} files -> The server recives the documents in the following order:
 *  1. Reporte Bimestral
 *  2. Evaluación Cualitativa Llenada por la Institución
 *  3. Autoevalaución Cualitativa Llenada por el Estudiante 
 * @param {Response} res 
 */
function saveFiles (residenciaId, files, documentType, res) {
  ResidenciaDocuments.insertMany([
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Reporte Bimestral',
      residenciaId: residenciaId,
      documentType: documentType,
      path: files.reporte[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Evaluación Cualitativa Llenada por la Institutción',
      residenciaId: residenciaId,
      documentType: documentType,
      path: files.evaluacion[0].path
    },
    {
      _id: new mongoose.Types.ObjectId(),
      documentName: 'Autoevaluación Culitatica Llenada por el Estudiante',
      residenciaId: residenciaId,
      documentType: documentType,
      path: files.autoevaluacion[0].path
    }
  ])
  .then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Documentos de reporte guardados!',
      savedDocuements: result.map(doc => {
        return {
          _id: doc._id,
          residenciaId: doc.residenciaId,
          documentName: doc.documentName,
          documentType: doc.documentType,
          request: {
            type: 'GET',
            url: `http://${process.env.SERVER}:${process.env.PORT}/residencias/report/get/${doc.servicioId}`
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
