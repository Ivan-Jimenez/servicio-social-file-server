const express = require('express')
const router = express.Router()
const multer = require('multer')

// NOTE: This must be added to the routes that required authentication.
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
 * Upload Bimester Report Files
 * The following data is expected to be send with the request:
 * @param {FormData} files
 * This documents shuold be append to the FormData object in that order:
 *  1. Reporte Bimestral
 *  2. Evaluación Cualitativa Llenada por la Institución
 *  3. Autoevalaución Cualitativa Llenada por el Estudiante 
 * @param {mongoose.Types.Object} servicioId should be also appended to the 
 * FormData.
 * 
 * @returns {JSONObject} 
 *    message: 'Documentos Iniciales Guardados',
 *    savedDocuments: {
 *       {
 *          id: mongoose.Types.ObjectId,
 *          documentName: String,
 *          documentType: String,
 *          path: String
 *       }
 *              .
 *              .
 *              .
 *    }
 */
//##############################################################################
router.post('/upload/:servicioId', uploadFiles, BimesterReportController.new)
//##############################################################################


/**#############################################################################
 * Get The Bimester Report Documents For The Servicio
 * @param {mongoose.Types.ObjectId} servicioId this should be in the request link.
 * 
 * @returns {JSONObject} 
 *   bimesterReport: {
 *      {
 *         id: mongoose.Types.ObjectId,
 *         documentName: String,
 *         documentType: String,
 *         path: String
 *      }
 *             .
 *             .
 *             .
 *   }
*/
//##############################################################################
router.get('/get/:servicioId', BimesterReportController.get)
//##############################################################################


// /** Fetch all bimester documents */
// router.get('/', checkAuth, BimesterReportController.getAll)


/** Delete */
/**#############################################################################
 * Delete Bimester Report Documents
 * @param {mongoose.Types.ObjectId} servicioId this should be in the request link.
 * 
 * @return {JSONObject} 
 *    {
 *      "message": 'Documentos borrados!'
 *    }
 */
//##############################################################################
router.delete('/delete/:servicioId', BimesterReportController.delete)
//##############################################################################


/** Get File */
/**############################################################################# 
 * Get A Specific File From The Initial Documents
 * @param {mongoose.Types.ObjectId} servicioId this should be in the request link.
 * @param {mongoose.Types.ObjectId} fileId this should be in the request link.
 * 
 * @returns A PDF file.
 */
//##############################################################################
router.get('/file/:servicioId/:fileId', BimesterReportController.getFile)
//##############################################################################

module.exports = router
