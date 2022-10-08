const runCode = require('../lib/runCode')
const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

router.use(bodyParser.json()) // for parsing routerlication/json
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.send('API requires POST to /code/<lang>')
})

router.post('/py', async (req, res) => {
  const { filePath } = req.body
  const result = await runCode('py', filePath)
  res.send(result)
})

router.post('/cpp', async (req, res) => {
  const { filePath } = req.body
  const result = await runCode('cpp', filePath)
  res.send(result)
})

router.post('/js', async (req, res) => {
  const { filePath } = req.body
  const result = await runCode('js', filePath)
  res.send(result)
})

module.exports = router