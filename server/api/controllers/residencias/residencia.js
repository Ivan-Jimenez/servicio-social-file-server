const mongoose = require('mongoose')

const Residencia = require('../../models/residencias/Residencia')

/** New */
exports.new = (req, res, next) => {
  console.log(req.body.residencia)
  const residenciaId = new mongoose.Types.ObjectId()
  Servicio.find({ control: req.body.control })
    .exec()
    .then(residencia => {
      if (residencia.length >= 1) {
        return res.status(409).json({
          error: 'El alumno ya se encuentra registrado en residencias!'
        })
      }
      const newResidencia = new Residencia({
        _id: residenciaId,
        supervisor: req.body.supervisor,
        control : req.body.control,
        career : req.body.career,
        name : req.body.name,
        lastName : req.body.lastName,
        programName: req.body.programName
      })
      newResidencia.save()
        .then(result => {
          console.log(result)
          res.status(200).json({
            message: 'Residencia registrada!',
            createdResidencia: {
              _id: result._id,
              control : result.control,
              career : result.career,
              name : result.name,
              lastName : result.lastName,
              programName: result.programName,
              request: {
                type: 'GET',
                url: `http://${process.env.SERVER}:${process.env.PORT}/residencias/get-one/${result._id}`
              }
            }
          })
        })
        .catch(err => {
          console.log(err)
          if (err.name === 'ValidationError') {
            res.status(400).json({
              error: 'Operación fallida. Datos incompletos!',
              // missing: err.errors
            })
          } else {
            res.status(500).json({
              error: err
            })
          }
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        // error: err
      })
    })
}

// TODO: Delete the documents from db and disk.
/** Delete */
exports.deleteOne = (req, res, next) => {
  Residencia.remove({ _id: req.params.residenciaId })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Residencia borrada!',
        request: {
          type: 'POST',
          url: `http://${process.env.SERVER}:${process.env.PORT}/residencias/new/`,
          body: {
            control: 'Number',
            career: 'String',
            name: 'String',
            lastName: 'String',
            programName: 'String'
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

/** Get All */
exports.getAll = (req, res, next) => {
  Residencia.find()
    .select(`
      _id
      supervisor
      control
      career
      name
      lastName
      programName
    `)
    .exec()
    .then(docs => {
      console.log(docs)
      const response = {
        count: docs.length,
        residencias: docs.map(doc => {
          return {
            _id : doc._id,
            supervisor: doc.supervisor,
            control : doc.control,
            career : doc.career,
            name : doc.name,
            lastName : doc.lastName,
            programName: doc.programName,
            request : {
              type: 'GET',
              url : `http://${process.env.SERVER}:${process.env.PORT}/residencias/get-one/${doc._id}`
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

/** Update */
exports.update = (req, res, next) => {
  console.log(req.body)
  const id = req.params.residenciaId
  const updateOps = {}
  Object.getOwnPropertyNames(req.body).forEach(prop => {
    updateOps[prop] = req.body[prop]
  })
  console.log(updateOps)
  Residencia.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Residencia actualizada!',
        request: {
          type: 'GET',
          url: `http://${process.env.SERVER}:${process.env.PORT}/residencias/update/${id}`
        }
      })
    })
}

/** Get One */
exports.getOne = (req, res, next) => {
  Residencia.find({ _id: req.params.residenciaId })
    .exec()
    .then(docs => {
      const response = docs.map(doc => {
        return {
          _id: doc._id,
          supervisor: doc.supervisor,
          control: doc.control,
          career: doc.career,
          name: doc.name,
          lastName: doc.lastName,
          programName: doc.programName
        }
      })
      console.log(response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}