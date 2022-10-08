const subscriberRecord = {}

const subscribers = {
  getSubscribers: () => subscriberRecords,
  setSubscriberToChannel: (channelID, userID, sid) => {
    if (subscriberRecord[channelID]) {
      subscriberRecord[channelID][userID] = { sid }
    } else {
      subscriberRecord[channelID] = {
        [userID]: { sid },
      }
    }
  },
  getSenderByChannel: (channelID, userID) => {
    const users = Object.keys(subscriberRecord[channelID])

    const sender = users.find((u) => u === userID)
    return subscriberRecord[channelID][sender]
  },
  getReceiverByChannel: (channelID, userID) => {
    if (channelID && userID) {
      const users = Object.keys(subscriberRecord[channelID])

      const receiver = users.find((u) => u !== userID)
      return subscriberRecord[channelID][receiver]
    }
  },
}

module.exports = subscribers
