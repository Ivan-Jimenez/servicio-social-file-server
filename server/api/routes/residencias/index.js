const express = require('express')
const router = express.Router()

const residenciasRouter = require('./residencia')
const initialDocumentsRouter = require('./initial-documents')
const reportRouter = require('./report')

router.use('/', residenciasRouter)
router.use('/initial-documents', initialDocumentsRouter)
router.use('/report', reportRouter)

module.exports = router
