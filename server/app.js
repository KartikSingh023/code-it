//entry point

// package imports
const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const subscribers = require('./socket.io/subscribers')
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
io.on('connection', (client) => {
  client.on('hostSession', (data) => {
    const { channelID } = data
    client.join(channelID)
  })
  client.on('joinSession', (data) => {
    const { channelID } = data
    client.join(channelID)
    io.to(channelID).emit('initialLoad')
  })
  client.on('realtime', (data) => {
    const { channelID, mode, input, output, code } = data
    io.to(channelID).emit('realReceive', { mode, input, code, output })
    // if (channelID && userID) {
    //   const sid = subscribers.getReceiverByChannel(channelID, userID)
    //   if (sid) {
    //     console.log(sid.sid)
    //     const receiverSocket = io.sockets.sockets.get(sid.sid)
    //     // console.log(receiverSocket.get(sid))
    //     // console.log(Object.keys(receiverSocket))
    //     receiverSocket.emit('realReceive', { mode, input, code, output })
    //   }
    // }
  })
})

// server listening on PORT
server.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
