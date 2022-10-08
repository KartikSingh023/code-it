const { socketEvents } = require('./socketEvents')
const {SOCKET} = require('../constants.js')

module.exports.initializer = (socketIo, server) => {
  const io = socketIo(server, {
    cors: {
      origin: SOCKET.ORIGIN,
      methods: SOCKET.METHODS,
      allowedHeaders: SOCKET.HEADERS,
      credentials: true,
    },
  })

  // socket listens to connection event
  io.on('connection', (client) => socketEvents(client, io))

  return io
}
