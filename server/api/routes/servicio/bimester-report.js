const express = require('express')
const router = express.Router()
const multer = require('multer')

const checkAuth = require('../../middleware/check-auth')

const BimesterReportController = require('../../controllers/servicio/bimester-report')

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, process.env.FILES_PATH)
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

const uploadFiles = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
}).fields([
  { name: 'reporte' },
  { name: 'evaluacion' },
  { name: 'autoevaluacion' }
])

/**
 * NOTE: 
 */

/** New Upload */
router.post('/upload/:servicioId', uploadFiles, BimesterReportController.new)

/** Get */
router.get('/get/:servicioId', BimesterReportController.get)

// /** Fetch all bimester documents */
// router.get('/', checkAuth, BimesterReportController.getAll)

/** Delete */
router.delete('/delete/:servicioId', BimesterReportController.delete)

/** Get File */
router.get('/file/:servicioId/:fileId', BimesterReportController.getFile)

module.exports = router
