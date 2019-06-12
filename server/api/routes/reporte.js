const express = require('express')
const router = express.Router()
const multer = require('multer')

const ReporteController = require('../controllers/reporte')

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
  { name: 'reporte' },
  { name: 'evaluacion' },
  { name: 'autoevaluacion' }
])

/** New bimester two report */
router.post('/', uploadFile, ReporteController.report_new)

/** Fetch report two documents */
router.get('/:servicioId', ReporteController.report_documents_get_one)

/** Fetch all report two documents */
router.get('/', ReporteController.report_documents_get_all)

/** Delete report two documents */
router.delete('/:servicioId', ReporteController.report_documents_delete_one)

module.exports = router
