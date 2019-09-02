const express = require('express')
const router = express.Router()
const multer = require('multer')

const checkAuth = require('../../middleware/check-auth')

const ReportController = require('../../controllers/residencias/report')

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
  // TODO: Replace names with residencia's report document
  { name: 'document_1' },
  { name: 'document_2' },
  { name: 'document_3' }
])

/**
 * NOTE: 
 */

/** New Upload */
router.post('/upload/:residenciaId', uploadFiles, ReportController.new)

/** Get */
router.get('/get/:residenciaId', ReportController.get)

// /** Fetch all bimester documents */
// router.get('/', checkAuth, BimesterReportController.getAll)

/** Delete */
router.delete('/delete/:residenciaId', ReportController.delete)

/** Get File */
router.get('/file/:residenciaId/:fileId', ReportController.getFile)

module.exports = router
