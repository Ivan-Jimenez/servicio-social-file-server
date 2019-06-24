const express = require('express')
const router = express.Router()
const multer = require('multer')

const checkAuth = require('../../middleware/check-auth')

const ServicioController = require('../../controllers/servicio')

const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, process.env.FILES_PATH)
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/ /g, '-'))
  }
})

const fileFilter = function (req, file, callback) {
  const ext = file.originalname.lastIndexOf('.')
  const fext = (ext < 1) ? '' : file.originalname.substr(ext + 1)
  if (fext !== 'pdf') {
    return callback(null, false)
  }
  callback(null, true)
}

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
}).fields([
  { name: 'solicitud' },
  { name: 'planTrabajo' },
  { name: 'cartaCompromiso' },
  { name: 'cartaAsignacion' }
])

/** Fetch all Servicio Social */
router.get('/', ServicioController.getAll)

/** Fetch initial documents */
router.get('/initialDocuments/:servicioId', ServicioController.initialDocumentsGetOne)

/** Fetch all inital documents */
router.get('/initialDocuments/', ServicioController.initialDocumentsGetAll)

/** Delete Initial Documents */
router.delete('/initialDocuments/:servicioId', ServicioController.initialDocumentsDeleteOne)

/** Delete Servicio Social */
router.delete('/delete/:servicioId', ServicioController.deleteOne)

/** New Servicio Social */
router.post('/', uploadFile, ServicioController.new)

module.exports = router
