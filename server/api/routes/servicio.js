const express = require('express')
const router = express.Router()
const multer = require('multer')

const ServicioController = require('../controllers/servicio')

const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, process.env.FILES_PATH)
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/ /g, '-'))
  }
})

const fileFilter = function (req, file, callback) {
  const ext = file.originalname.lastIndexOf('.');
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
router.get('/', ServicioController.servicio_get_all)

/** Fetch initial documents */
router.get('/initialDocuments/:Id', ServicioController.initial_documents_get_one)

/** Fetch all inital documents */
router.get('/initialDocuments/', ServicioController.initial_documents_get_all)

/** Delete Initial Documents */
router.delete('/initialDocuments/:servicioId', ServicioController.initial_documents_delete_one)

/** Delete Servicio Social */
router.delete('/delete/:servicioId', ServicioController.servicio_delete_one)

/** New Servicio Social */
router.post('/', uploadFile, ServicioController.servicio_new)

module.exports = router
