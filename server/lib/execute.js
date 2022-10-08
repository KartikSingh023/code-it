// imports
const axios = require('axios')

// execution function
const execute = async (language, filePath) => {
  const data = { filePath: filePath }
  const options = {
    // http request headers
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  const result = await axios.post(
    `http://executor:8080/code/${language}`,
    data,
    options
  ) // axios posts to executor in the second container
  return result.data
}

module.exports = execute
