const { socketEvents } = require('./socketEvents')

module.exports.initializer = (socketIo, server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  })

  // socket listens to connection event
  io.on('connection', (client) => socketEvents(client, io))

  return io
}
