const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      res.status(400).send({
        error: 'Verifique los datos.'
      })
      // switch (error.details[0].context.key) {
      //   case 'name':
      //     res.status(400).send({
      //       error: 'El nombre no puede estar vacío.'
      //     })
      //     break
      //   case 'lastName':
      //     res.status(400).send({
      //       erro: 'El apellido no puede estar vacío'
      //     })
      //     break
      //   case 'email':
      //     res.status(400).send({
      //       error: 'Ingrese una cuenta de email válida.'
      //     })
      //   case 'password':
      //     res.status(400).send({
      //       error: `La contraseña debe tener minímo 8 y máximo 32 caracteres. 
      //         Letras y numeros`
      //     })
      //     break
      // }
    } else {
      next()
    }
  },
  newSocialService (req, res, next) {
    const schema = {
      control: Joi.number().integer().required(),
      career: Joi.string().required(),
      name: Joi.string().required(),
      programName: Joi.string(),
      status: Joi.string().required()
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'control':
          res.status(400).send({
            error: `El número de control debe ser un número de 8 digítos!`
          })
          break
        case 'career':
          res.status(400).send({
            error: 'Seleccione una carrera.'
          })
          break
        case 'name':
          res.status(400).send({
            error: 'El nombre del alumno no puede estar vacío.'
          })
          break
        case 'programName':
          res.status(400).send({
            error: 'El nombre del programa no puede estar vacío.'
          })
          break
        case 'status':
          res.status(400).send({
            error: 'Seleccione un estatus.'
          })
          break
        default:
          res.status(400).send({
            error: 'Verifique los datos.'
          })
      }
    } else {
      next()
    }
  }
}