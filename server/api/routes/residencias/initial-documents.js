const express = require('express')
const router = express.Router()
const multer = require('multer')

// NOTE: Add to all routes for authentication 
// const checkAuth = require('../../middleware/check-auth')

const InitialDocumentsController = require('../../controllers/residencias/initial-documents')

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, `${process.env.FILES_PATH}/residencias`)
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
  // TODO: Replace with name of the initial residencia's documents
  { name: 'document_1' },
  { name: 'document_2' },
  { name: 'document_3' },
  { name: 'document_4' }
])

/** New Upload */
router.post('/upload/:residenciasId', uploadFiles, InitialDocumentsController.new)

/** Get */
router.get('/get/:residenciaId', InitialDocumentsController.get)

/** Get All */
// router.get('/get-all/', InitialDocumentsController.initialDocumentsGetAll)

/** Delete */
router.delete('/delete/:residenciaId', InitialDocumentsController.delete)

/** Get File */
router.get('/file/:residenciaId/:fileId', InitialDocumentsController.getFile)

module.exports = router
