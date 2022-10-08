//entry point

// package imports
const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')

// global variables initialised
const PORT = 9000
const app = express()
const server = require('http').createServer(app)

// middleware, routing
app.use('/', require('./routes/handler'))
//cors
app.use(cors())
app.use(bodyParser.json())
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

// socket listens to connection event
io.on('connection', (client) => {
  // when client emits a 'hostSession' event
  client.on('hostSession', (data) => {
    const { channelID } = data
    // adds the client's ID to the room
    client.join(channelID)
  })
  // when client emits a 'joinSession' event
  client.on('joinSession', (data) => {
    const { channelID } = data
    // adds the client's ID to the room
    client.join(channelID)
    // server emits initialLoad event to this new client in the room
    io.to(channelID).emit('initialLoad')
  })
  // when client emits a 'realTime' event
  client.on('realtime', (data) => {
    const { channelID, mode, input, output, code } = data
    // server emits 'realReceive' event to this client
    io.to(channelID).emit('realReceive', { mode, input, code, output })
  })
})

// server listening on PORT
server.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
