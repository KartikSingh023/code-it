const { socketEvents } = require('./socketEvents')
const CONSTANTS = require('../constants.js')
const SOCKET = CONSTANTS.SOCKET

module.exports.initializer = (socketIo, server) => {
  const io = socketIo(server, {
    cors: {
      origin: SOCKET.ORIGIN,
      methods: SOCKET.METHODS,
      credentials: true,
    },
  })

  // socket listens to connection event
  io.on('connection', (client) => socketEvents(client, io))

  return io
}
