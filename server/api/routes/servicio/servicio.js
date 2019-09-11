const express = require('express')
const router = express.Router()

const ServicioController = require('../../controllers/servicio/servicio')

/** Get All */
router.get('/get-all', ServicioController.getAll)

/** Get One */router.get('/get-one/:servicioId', ServicioController.getOne)

/** Delete */
router.delete('/delete/:servicioId', ServicioController.deleteOne)

/** New */
router.post('/new', ServicioController.new)

/** Update */
router.patch('/update/:servicioId', ServicioController.update)

module.exports = router