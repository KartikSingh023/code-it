//entry point

// package imports
const express = require('express')

// global variables initialised
const PORT = process.env.PORT || 9000
const app = express()

// middleware, routing
app.use('/', require('./server/app'))

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
