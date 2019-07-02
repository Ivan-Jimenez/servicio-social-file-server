const express = require('express')
const router = express.Router()
const multer = require('multer')

// const checkAuth = require('../../middleware/check-auth')

const InitialDocumentsController = require('../../controllers/servicio/initial-documents')

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, `${process.env.FILES_PATH}/servicio`)
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/ /g, '-'))
  }
})

const fileFilter = (req, file, callback) => {
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
// router.get('/', InitialDocumentsController.getAll)

/** Initial documents upload files */
router.post('/upload', uploadFile)

/** Fetch initial documents */
router.get('/get-one/:servicioId', InitialDocumentsController.initialDocumentsGetOne)

/** Fetch all inital documents */
router.get('/get-all/', InitialDocumentsController.initialDocumentsGetAll)

/** Delete Initial Documents */
router.delete('/delete-one/:servicioId', InitialDocumentsController.initialDocumentsDeleteOne)

/** Delete Servicio Social */
// router.delete('/delete/:servicioId', InitialDocumentsController.deleteOne)

/** New Servicio Social */
// router.post('/', uploadFile, InitialDocumentsController.new)

module.exports = router
