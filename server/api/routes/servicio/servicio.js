const express = require('express')
const router = express.Router()

const ServicioController = require('../../controllers/servicio/servicio')

/** Fetch all Servicio Social */
router.get('/get-all', ServicioController.getAll)

/** Get one Servicio Social */
router.get('/get-one/:servicioId', ServicioController.getOne)

/** Delete Servicio Social */
router.delete('/delete-one/:servicioId', ServicioController.deleteOne)

/** New Servicio Social */
router.post('/new', ServicioController.new)

TODO:
/** Update Servicio */
router.post('/update/:servicioId', ServicioController.update)

module.exports = router