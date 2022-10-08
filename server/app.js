//entry point

// package imports
const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
// socket.io
const socket = require('./socket')
// global variables initialised
const PORT = 9000
const app = express()
const server = require('http').createServer(app)

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//cors
app.use(cors())
// middleware, routing
app.use('/', require('./routes/handler'))

socket.initializer(socketIo, server)

// server listening on PORT
server.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
