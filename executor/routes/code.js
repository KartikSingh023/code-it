const runCode = require('../lib/runCode')
const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

router.use(bodyParser.json()) // for parsing routerlication/json
router.use(bodyParser.urlencoded({ extended: true }))

// GET handler for /
router.get('/', (req, res) => {
  res.send('API requires POST to /code/<lang>')
})

// POST handler for /py
router.post('/py', async (req, res) => {
  const { filePath } = req.body
  const result = await runCode('py', filePath) // executes runCode() on specified .py and input files
  res.send(result)
})

// POST handler for /cpp
router.post('/cpp', async (req, res) => {
  const { filePath } = req.body
  const result = await runCode('cpp', filePath) // executes runCode() on specified .cpp and input files
  res.send(result)
})

// POST handler for /js
router.post('/js', async (req, res) => {
  const { filePath } = req.body
  const result = await runCode('js', filePath) // executes runCode() on specified .js and input files
  res.send(result)
})

module.exports = router