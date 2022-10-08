//entry point

// package imports
const express = require('express')

// global variables initialised
const PORT = 8080
const app = express()

app.get('*', (req, res) => {
  res.status(404).send('API does not support this endpoint')
})

app.use('/code', require('./routes/code'))

// listening on PORT
app.listen(PORT, () => {
  console.log('Executor available on port 8080')
})
