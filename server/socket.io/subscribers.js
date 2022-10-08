const subscriberRecord = {}

const subscribers = {
  getSubscribers: () => subscriberRecords,
  setSubscriberToChannel: (sessionID, userID, sid) => {
    if (clientRecord[sessionID]) {
      clientRecord[sessionID][userID] = { sid }
    } else {
      clientRecord[sessionID] = {
        [userID]: { sid },
      }
    }
  },
}
