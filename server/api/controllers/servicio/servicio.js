const mongoose = require('mongoose')

const Servicio = require('../../models/servicio/Servicio')

/** New */
exports.new = (req, res, next) => {
  console.log({
    control : req.body.control,
    career : req.body.career,
    name : req.body.name,
    lastName : req.body.lastName,
    programName: req.body.programName,
    startDate: req.body.startDate,
    endDate : req.body.endDate
  })
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
            message: 'Servicio Social registrado!'
          })
        })
        .catch(err => {
          console.log(err)
          if (err.name === 'ValidationError') {
            res.status(400).json({
              error: 'Operación fallida. Datos incompletos!'
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
              url : `http://${process.env.SERVER}:${process.env.PORT}/servicio/${doc._id}`
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
  res.status(200).json({
    message: 'Not done yet!'
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