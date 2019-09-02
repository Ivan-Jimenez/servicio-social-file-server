const express = require('express')
const router = require('router')

const residenciasRouter = require('./residencias')
const initialDocumentsRouter = require('./initial-documents')
const reportRouter = require('./report')

router.use('/', residenciasRouter)
router.use('/initial-documents', initialDocumentsRouter)
router.use('/report', reportRouter)

module.exports = router
