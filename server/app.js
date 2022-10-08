//entry point

// package imports
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')


// global variables initialised
const PORT = 9000
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

var subscribers = []

io.on('connection', (client) => {
  client.on('joinSession', (sessionId) => {
    subscribers.push({sessionId: ''})
    console.log(sessionId)
  })
})

// middleware, routing
app.use('/', require('./routes/handler'))

// app listening on PORT
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})