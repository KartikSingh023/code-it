const express = require('express')
const runCode = require('./lib/runCode')
const bodyParser = require('body-parser')

const PORT = 8080
const app = express()

app.get('*', (req, res) => {
  res.status(404).send('API does not support this endpoint')
})

app.use('/code', require('./routes/code'))

app.listen(PORT, () => {
  console.log('Executor available on port 8080')
})
