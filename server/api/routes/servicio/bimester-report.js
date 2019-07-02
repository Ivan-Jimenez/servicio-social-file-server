const express = require('express')
const router = express.Router()
const multer = require('multer')

const checkAuth = require('../../middleware/check-auth')

const BimesterReportController = require('../../controllers/servicio/bimester-report')

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
router.post('/', checkAuth, uploadFile, BimesterReportController.new)

/** Fetch bimester documents */
router.get('/:servicioId', checkAuth, BimesterReportController.getOne)

/** Fetch all bimester documents */
router.get('/', checkAuth, BimesterReportController.getAll)

/** Delete bimester documents */
router.delete('/:servicioId', checkAuth, BimesterReportController.deleteOne)

module.exports = router
