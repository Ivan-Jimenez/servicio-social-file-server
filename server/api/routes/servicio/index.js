const express = require('express')
const router = express.Router()

const servicioRouter = require('./servicio')
const initialDocumentsRouter = require('./initial-documents')
const bimesterReportRouter = require('./bimester-report')

router.use('/', servicioRouter)
router.use('/initial-documents', initialDocumentsRouter)
router.use('/bimester-report', bimesterReportRouter)
// router.use('/final-documents', finalDocumentsRouter)

module.exports = router