const axios = require('axios')

const execute = async (language, filePath) => {
  const data = { filePath: filePath }
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }
  const result = await axios.post(`http://executor:8080/code/${language}`, data, options)
  return result.data
}

module.exports = execute
