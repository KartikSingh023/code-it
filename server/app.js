//entry point

// package imports
const express = require('express')

// global variables initialised
const PORT = 9000
const app = express()

// middleware, routing
app.use('/', require('./routes/handler'))

// app listening on PORT
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})