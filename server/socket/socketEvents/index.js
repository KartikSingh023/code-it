module.exports.initializer = (io) => {
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
}
