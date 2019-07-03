const mongoose = require('mongoose')

const Servicio = require('../../models/servicio/Servicio')

/** New */
exports.new = (req, res, next) => {
  console.log(req.body)
  const servicioId = new mongoose.Types.ObjectId()
  Servicio.find({ control: req.body.control })
    .exec()
    .then(servicio => {
      if (servicio.length >= 1) {
        return res.status(409).json({
          error: 'El alumno ya se encuentra registrado al Servicio Social!'
        })
      }
      const newServicio = new Servicio({
        _id: servicioId,
        supervisor: req.body.supervisor,
        control : req.body.control,
        career : req.body.career,
        name : req.body.name,
        lastName : req.body.lastName,
        programName: req.body.programName,
        startDate: req.body.startDate,
        endDate : req.body.endDate
      })
      newServicio.save()
        .then(result => {
          console.log(result)
          res.status(200).json({
            message: 'Servicio Social registrado!',
            createdServicio: {
              _id: result._id,
              control : result.control,
              career : result.career,
              name : result.name,
              lastName : result.lastName,
              programName: result.programName,
              startDate: result.startDate,
              endDate : result.endDate,
              request: {
                type: 'GET',
                url: `http://${process.env.SERVER}:${process.env.PORT}/servicio/get-one/${result._id}`
              }
            }
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
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

// TODO: Delete the documents from db and disk.
/** Delete */
exports.deleteOne = (req, res, next) => {
  Servicio.remove({ _id: req.params.servicioId })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Servicio Social borrado!',
        request: {
          type: 'POST',
          url: `http://${process.env.SERVER}:${process.env.PORT}/servicio/new/`,
          body: {
            control: 'Number',
            career: 'String',
            name: 'String',
            lastName: 'String',
            programName: 'String',
            startDate: 'Date',
            endDate: 'Date'
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
  Servicio.find()
    .select(`
      _id
      supervisor
      control
      career
      name
      lastName
      programName
      startDate
      endDate
    `)
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        servicios: docs.map(doc => {
          return {
            _id : doc._id,
            supervisor: doc.supervisor,
            control : doc.control,
            career : doc.career,
            name : doc.name,
            lastName : doc.lastName,
            programName: doc.programName,
            startDate: doc.startDate,
            endDate : doc.endDate,
            request : {
              type: 'GET',
              url : `http://${process.env.SERVER}:${process.env.PORT}/servicio/get-one/${doc._id}`
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
  const id = req.params.servicioId
  const updateOps = {}
  Object.getOwnPropertyNames(req.body).forEach(prop => {
    updateOps[prop] = req.body[prop]
  })
  console.log(updateOps)
  Servicio.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Servicio Social actualizado!',
        request: {
          type: 'GET',
          url: `http://${process.env.SERVER}:${process.env.PORT}/servicio/update/${id}`
        }
      })
    })
}

/** Get One */
exports.getOne = (req, res, next) => {
  Servicio.find({ _id: req.params.servicioId })
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
            programName: doc.programName,
            startDate: doc.startDate,
            endDate: doc.endDate
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