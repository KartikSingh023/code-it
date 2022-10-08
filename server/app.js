//entry point

// package imports
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
// global variables initialised
const PORT = 9000
const app = express()
//cors
app.use(cors())
// middleware, routing
app.use('/', require('./routes/handler'))

// app listening on PORT
const server = app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (client) => {
  client.on('joinSession', (socket) => {
    console.log(socket)
  })
})
