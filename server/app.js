//entry point

// package imports
const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const subscribers = require('./socket.io/subscribers')
// global variables initialised
const PORT = 9000
const app = express()
const server = require('http').createServer(app)
// middleware, routing
app.use('/', require('./routes/handler'))
//cors
app.use(cors())

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (client) => {
  client.on('joinSession', (data) => {
    console.log(data)
    const { channelID, userID } = data
    subscribers.setSubscriberToChannel(channelID, userID, client.id)
  })
  client.on('realtime', (data) => {
    console.log(data)
    const { channelID, userID, mode, input, output, code } = data
    if (channelID && userID) {
      const { sid } = subscribers.getReceiverByChannel(channelID, userID)
      console.log({ sid })
      const receiverSocket = io.sockets
      console.log({ receiverSocket })
      // receiverSocket.emit('realReceive', { mode, input, code, output })
    }
  })
})

// server listening on PORT
server.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
