const express = require('express')
const router = express.Router()
const multer = require('multer')

const FinalController = require('../controllers/final')

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

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
})
.fields([
  { name: 'evaluacion' },
  { name: 'evaluacionFinal' },
  { name: 'autoevaluacion' },
  { name: 'autoevaluacionFinal' },
  { name: 'reporte' },
  { name: 'reporteFinal' },
  { name: 'evaluacionActividades' },
  { name: 'cartaTerminacion' }
])

/** New final report */
router.post('/', uploadFile, FinalController.final_new)

module.exports = router
