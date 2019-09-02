const express = require('express')
const router = express.Router()

const ResidenciaController = require('../../controllers/residencias/residencia')

/** Get All */
router.get('/get-all', ResidenciaController.getAll)

/** Get One */
router.get('/get-one/:residenciaId', ResidenciaController.getOne)

/** Delete */
router.delete('/delete/:residenciaId', ResidenciaController.delete)

/** New */
router.post('/new', ResidenciaController.new)

/** Update */
router.patch('/update/:residenciaId', ResidenciaController.update)

module.exports = router