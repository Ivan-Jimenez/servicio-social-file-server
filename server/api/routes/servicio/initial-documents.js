const express = require('express')
const router = express.Router()
const multer = require('multer')

// NOTE: Add to all routes that will need authentication.
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

// Filters PDF files
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
  limits: { fileSize: 1024 * 1024 * 5 }, // Max file size 5MB
  fileFilter: fileFilter
}).fields([
  { name: 'solicitud' },
  { name: 'planTrabajo' },
  { name: 'cartaCompromiso' },
  { name: 'cartaAsignacion' }
])


/**  
 * Upload Initial Documents Files
 * The following data is expected to be send with the request:
 * @param {FormData} files
 * This documents shuold be append to the FormData object in that order:
 *  1. Solicitud de Servicio Social
 *  2. Plan de trabajo
 *  3. Carta Compromiso
 *  4. Carta Asignación
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
router.post('/upload/', uploadFiles, InitialDocumentsController.new)
//##############################################################################


/**#############################################################################
 * Get The Initial Documents For The Servicio
 * @param {mongoose.Types.ObjectId} servicioId this should be in the request link.
 * 
 * @returns {JSONObject} 
 *   initialDocuments: {
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
router.get('/get/:servicioId', InitialDocumentsController.get)
//##############################################################################


/** Get All */
// router.get('/get-all/', InitialDocumentsController.initialDocumentsGetAll)


/**#############################################################################
 * Delete Servicio Social Documents
 * @param {mongoose.Types.ObjectId} servicioId this should be in the request link.
 * 
 * @return {JSONObject} 
 *    {
 *      "message": 'Documentos borrados!'
 *    }
 */
//##############################################################################
router.delete('/delete/:servicioId', InitialDocumentsController.delete)
//##############################################################################


/**############################################################################# 
 * Get A Specific File From The Initial Documents
 * @param {mongoose.Types.ObjectId} servicioId this should be in the request link.
 * @param {mongoose.Types.ObjectId} fileId this should be in the request link.
 * 
 * @returns A PDF file.
 */
//##############################################################################
router.get('/file/:servicioId/:fileId', InitialDocumentsController.getFile)
//##############################################################################

module.exports = router
