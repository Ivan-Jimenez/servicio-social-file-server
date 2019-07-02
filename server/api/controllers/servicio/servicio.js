const mongoose = require('mongoose')

const Servicio = require('../../models/servicio/Servicio')

/** New Servicio Social */
exports.new = (req, res, next) => {
  // FIXME: Don't save if a field is null.
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
        _id      : servicioId,
        control  : req.body.control,
        career   : req.body.career,
        name     : req.body.name,
        lastName : req.body.lastName,
        programName: req.body.programName,
        startDate: req.body.startDate,
        endDate  : req.body.endDate
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
          return res.status(500).json({
            error: err
          })
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

/** Get all Servicio Social */
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
            _id      : doc._id,
            control  : doc.control,
            career   : doc.career,
            name     : doc.name,
            lastName : doc.lastName,
            programName: doc.programName,
            startDate: doc.startDate,
            endDate  : doc.endDate,
            request  : {
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